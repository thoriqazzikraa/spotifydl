const { isUrl, tags2, tags, convertMs } = require("../function")
const nodeID3 = require("node-id3")
const axios = require("axios")
const cheerio = require("cheerio")
const fetch = require("node-fetch")
const spot = require("spotify-finder")
const spotify = new spot({
  consumer: {
    key: "9e1c5e192a8141c59b7e91f2848e6a9c",
    secret: "78e2ece45fa446c98517d2cbb3271486"
  }
})
const options = {
  headers: {
    Origin: "https://spotifydown.com",
    Referer: "https://spotifydown.com/"
  }
}

async function getOriginalUrl(url) {
  const data = await fetch(url)
  return data.url
}

async function downloads(url) {
  if (!isUrl(url)) throw new Error("Please input Url")
  if (url.includes("spotify.link")) {
    const originalUrl = await getOriginalUrl(url)
    const track = await axios.get(`https://api.spotifydown.com/metadata/track/${originalUrl.split("track/")[1].split("?")[0]}`, options)
    const { data } = await axios.get(`https://api.spotifydown.com/download/${track.data.id}`, options)
    const audioUrl = await fetch(data.link).then((res) => res.buffer())
    const imgUrl = await fetch(data.metadata.cover).then((res) => res.buffer())
    const writeTags = tags2(data.metadata.title, data.metadata.artists, data.metadata.releaseDate, data.metadata.album, imgUrl)
    const audioBuffer = await nodeID3.write(writeTags, audioUrl)
    const result = {
      success: data.success,
      metadata: data.metadata,
      audioBuffer: audioBuffer
    }
    return result
  } else if (url.includes("open.spotify.com")) {
    const { data } = await axios.get(`https://api.spotifydown.com/download/${url.split("track/")[1].split("?")[0]}`, options)
    const audioUrl = await fetch(data.link).then((res) => res.buffer())
    const imgUrl = await fetch(data.metadata.cover).then((res) => res.buffer())
    const writeTags = tags2(data.metadata.title, data.metadata.artists, data.metadata.releaseDate, data.metadata.album, imgUrl)
    const audioBuffer = await nodeID3.write(writeTags, audioUrl)
    const result = {
      success: data.success,
      metadata: data.metadata,
      audioBuffer: audioBuffer
    }
    return result
  } else {
    const result = {
      status: false,
      message: "Please input valid spotify url"
    }
    console.log(result)
    return result
  }
}

async function search(query, limit) {
  if (isUrl(query)) throw new Error("Search function not support for url")
  const limits = limit ? limit : 1
  const data = await spotify.search({ q: query, type: "track", limit: limits })
  return data.tracks
}

async function downloadAlbum(url) {
  let result = { type: null, metadata: {}, trackList: [] }
  if (!isUrl(url)) throw new Error("Input Url")
  try {
    if (url.includes("spotify.link")) {
      const getOrigin = await getOriginalUrl(url)
      if (!getOrigin.includes("album/") && !getOrigin.includes("playlist/")) throw new Error("Invalid album/playlist url")
      if (getOrigin.includes("album/")) {
        var inputData = "album/"
      } else {
        var inputData = "playlist/"
      }
      const metaData = await axios.get(`https://api.spotifydown.com/metadata/${inputData}${getOrigin.split(inputData)[1].split("?")[0]}`, options)
      result.type = inputData.split("/")[0]
      result.metadata = metaData.data
      const { data } = await axios.get(`https://api.spotifydown.com/trackList/${inputData}${getOrigin.split(inputData)[1].split("?")[0]}`, options)
      console.log(`Downloading audio...`)
      console.log("Please wait for a moment, this process will take for a couple minutes")
      for (let i = 0; i < data.trackList.length; i++) {
        const downloading = await downloads(`https://open.spotify.com/track/${data.trackList[i].id}`)
        result.trackList.push(downloading)
      }
      return result
    } else if (url.includes("open.spotify.com")) {
      if (!url.includes("album/") && !url.includes("playlist/")) throw new Error("Invalid album/playlist url")
      if (url.includes("album/")) {
        var inputData = "album/"
      } else {
        var inputData = "playlist/"
      }
      const metaData = await axios.get(`https://api.spotifydown.com/metadata/${inputData}${url.split(inputData)[1].split("?")[0]}`, options)
      result.type = inputData.split("/")[0]
      result.metadata = metaData.data
      const { data } = await axios.get(`https://api.spotifydown.com/trackList/${inputData}${url.split(inputData)[1].split("?")[0]}`, options)
      console.log("Downloading audio...")
      console.log("Please wait for a moment, this process will take for a couple minutes")
      for (let i = 0; i < data.trackList.length; i++) {
        const downloading = await downloads(`https://open.spotify.com/track/${data.trackList[i].id}`)
        result.trackList.push(downloading)
      }
      return result
    } else {
      throw new Error("Invalid Url!")
    }
  } catch (err) {
    console.log(err)
    return String(err)
  }
}

async function downloadTrack(song) {
  let result = {}
  if (isUrl(song)) {
    try {
      if (song.includes("spotify.link")) {
        const getOrigin = await getOriginalUrl(song)
        if (!getOrigin.includes("track/")) {
          ;(result.status = false), (result.message = "Download track not support for Album/Playlist")
          console.log(result)
          return result
        }
        var tracks = await spotify.getTrack(getOrigin.split("track/")[1].split("?")[0])
      } else {
        var tracks = await spotify.getTrack(song.split("track/")[1].split("?")[0])
      }
      const downloadData = await downloads(song)
      result = {
        status: true,
        title: tracks.name,
        artists: tracks.artists.map((art) => art.name).join(", "),
        duration: convertMs(tracks.duration_ms),
        explicit: tracks.explicit,
        popularity: tracks.popularity,
        url: tracks.external_urls.spotify,
        album: {
          name: tracks.album.name,
          type: tracks.album.album_type,
          tracks: tracks.album.total_tracks,
          releasedDate: tracks.album.release_date
        },
        imageUrl: tracks.album.images[0].url,
        audioBuffer: downloadData.audioBuffer
      }
      return result
    } catch (err) {
      result = {
        status: false,
        message: "Unknown error occurred!\n\n" + String(err)
      }
      console.log(err)
      return result
    }
  } else {
    try {
      const searchTrack = await search(song, 1)
      const downloadData = await downloads(searchTrack.items[0].external_urls.spotify)
      result = {
        status: true,
        title: searchTrack.items[0].name,
        artists: searchTrack.items[0].artists.map((art) => art.name).join(", "),
        duration: convertMs(searchTrack.items[0].duration_ms),
        explicit: searchTrack.items[0].explicit,
        popularity: searchTrack.items[0].popularity,
        url: searchTrack.items[0].external_urls.spotify,
        album: {
          name: searchTrack.items[0].album.name,
          type: searchTrack.items[0].album.album_type,
          tracks: searchTrack.items[0].album.total_tracks,
          releasedDate: searchTrack.items[0].album.release_date
        },
        imageUrl: downloadData.metadata.cover,
        audioBuffer: downloadData.audioBuffer
      }
      return result
    } catch (err) {
      result = {
        status: false,
        message: "Unknown error occurred!\n\n" + String(err)
      }
      console.log(result)
      return result
    }
  }
}

module.exports = {
  downloadAlbum,
  getOriginalUrl,
  search,
  downloadTrack,
  downloads
}
