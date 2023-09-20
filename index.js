const { isUrl, tags, convertMs } = require("./function");
const axios = require("axios");
const cheerio = require("cheerio");
const formData = require("form-data")
const spot = require("spotify-finder");
const spotify = new spot({
  consumer: {
    key: "271f6e790fb943cdb34679a4adcc34cc",
    secret: "c009525564304209b7d8b705c28fd294",
  },
});

async function downloads(url) {
  try {
    const getValue = async () => {
      const data = await axios.get("https://spotifymate.com/", {
        headers: {
          "user-agent": "PostmanRuntime/7.32.2"
        }
      })
      const $ = cheerio.load(data.data)
      const name = $("#get_video > input[type=hidden]:nth-child(4)").attr("name")
      const val = $("#get_video > input[type=hidden]:nth-child(4)").val()
      const cookie = data.headers['set-cookie'][0].split(";")[0]
      const result = {
        cookie: cookie,
        name: name,
        value: val
      }
      return result
    }
    const dataValue = await getValue()
    const bodyForm = new formData()
    bodyForm.append("url", url)
    bodyForm.append(dataValue.name, dataValue.value)
    const { data } = await axios("https://spotifymate.com/action", {
      method: "POST",
      data: bodyForm,
      headers: {
        "user-agent": "PostmanRuntime/7.32.2",
        "cookie": dataValue.cookie
      }
    })
    const $ = cheerio.load(data)
    const result = {
      status: true,
      title: $("div.row > div > div:nth-child(1) > div:nth-child(2) > div > h3 > div").text(),
      artists: $("div.row > div > div:nth-child(1) > div:nth-child(2) > p").text(),
      image: $("div.row > div > div:nth-child(1) > div:nth-child(1) > img").attr("src"),
      url: $("div.row > div > #download-block > div:nth-child(1) > a").attr("href")
    }
    return result
  } catch (err) {
    const result = {
      status: false,
      message: "Unknown error occurred.\n\n" + String(err)
    }
    console.log(result)
    return result
  }
}

async function search(query, limit) {
  if (isUrl(query)) throw new Error("Search function not support for url");
  const limits = limit ? limit : 1;
  const data = await spotify.search({ q: query, type: "track", limit: limits });
  return data.tracks;
}

async function downloadTrack(song) {
  let result = {}
  if (isUrl(song)) {
    try {
      if (song.includes("spotify.link")) {
        const tracks = await downloads(song)
        return tracks
      }
      if (song.includes("open.spotify.com")) {
        const tracks = await spotify.getTrack(song.split("track/")[1].split("?")[0])
        const downloadData = await downloads(song)
        result = {
          status: true,
          title: tracks.name,
          artists: tracks.artists.map(art => art.name).join(", "),
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
          imageUrl: downloadData.image,
          downloadAudio: downloadData.url
        }
        return result
      }
    } catch (err) {
      result = {
        status: false,
        statusCode: err.response.body.error.status,
        message: err.response.body.error.message
      }
      console.log(result)
      return result
      }
    } else {
      try {
        const searchTrack = await search(song, 1)
        const downloadData = await downloads(searchTrack.items[0].external_urls.spotify)
        result = {
          status: true,
          title: searchTrack.items[0].name,
          artists: searchTrack.items[0].artists.map(art => art.name).join(", "),
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
          imageUrl: downloadData.image,
          downloadAudio: downloadData.url
        }
        return result
      } catch (err) {
        result = {
          status: false,
          message: "Unknown error occurred!"
        }
        console.log(result)
        return result
      }
    }
  }

module.exports = {
  search,
  downloadTrack,
  downloads
};
