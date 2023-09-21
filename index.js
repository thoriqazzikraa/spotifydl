const { isUrl, tags, convertMs } = require("./function");
const fetch = require("node-fetch");
const nodeID3 = require("node-id3");
const axios = require("axios");
const cheerio = require("cheerio");
const formData = require("form-data");
const spot = require("spotify-finder");
const spotify = new spot({
  consumer: {
    key: "9e1c5e192a8141c59b7e91f2848e6a9c",
    secret: "78e2ece45fa446c98517d2cbb3271486",
  },
});

async function getOriginalUrl(url) {
  const { data } = await axios.get(`https://api.allorigins.win/get?url=${url}`);
  let $ = cheerio.load(data.contents);
  return $(".secondary-action").attr("href");
}

async function downloads(url) {
  if (!isUrl(url)) throw new Error("Please input Url");
  if (url.includes("spotify.link")) {
    const originalUrl = await getOriginalUrl(url);
    const track = await axios.get(
      `https://api.spotifydown.com/metadata/track/${
        originalUrl.split("track/")[1].split("?")[0]
      }`,
      {
        headers: {
          Origin: "https://spotifydown.com",
          Referer: "https://spotifydown.com/",
        },
      }
    );
    const { data } = await axios.get(
      `https://api.spotifydown.com/download/${track.data.id}`,
      {
        headers: {
          Origin: "https://spotifydown.com",
          Referer: "https://spotifydown.com/",
        },
      }
    );
    return data;
  } else if (url.includes("open.spotify.com")) {
    const { data } = await axios.get(
      `https://api.spotifydown.com/download/${
        url.split("track/")[1].split("?")[0]
      }`,
      {
        headers: {
          Origin: "https://spotifydown.com",
          Referer: "https://spotifydown.com/",
        },
      }
    );
    return data;
  } else {
    const result = {
      status: false,
      message: "Please input valid spotify url",
    };
    console.log(result);
    return result;
  }
}

async function search(query, limit) {
  if (isUrl(query)) throw new Error("Search function not support for url");
  const limits = limit ? limit : 1;
  const data = await spotify.search({ q: query, type: "track", limit: limits });
  return data.tracks;
}

async function downloadTrack(song) {
  let result = {};
  if (isUrl(song)) {
    try {
      if (song.includes("spotify.link")) {
        const getOrigin = await getOriginalUrl(song);
        var tracks = await spotify.getTrack(
          getOrigin.split("track/")[1].split("?")[0]
        );
      } else {
        var tracks = await spotify.getTrack(
          song.split("track/")[1].split("?")[0]
        );
      }
      const downloadData = await downloads(song);
      const fetchAudio = await fetch(downloadData.link).then((res) =>
        res.buffer()
      );
      const fetchImg = await fetch(tracks.album.images[0].url).then((res) =>
        res.buffer()
      );
      const metadataAudio = tags(
        tracks.name,
        tracks.artists.map((art) => art.name).join(", "),
        tracks.album.release_date,
        tracks.album.name,
        fetchImg,
        tracks.track_number
      );
      const audioBuff = await nodeID3.write(metadataAudio, fetchAudio);
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
          releasedDate: tracks.album.release_date,
        },
        imageUrl: tracks.album.images[0].url,
        audioBuffer: audioBuff,
      };
      return result;
    } catch (err) {
      result = {
        status: false,
        message: "Unknown error occurred!\n\n" + String(err),
      };
      console.log(result);
      return result;
    }
  } else {
    try {
      const searchTrack = await search(song, 1);
      const downloadData = await downloads(
        searchTrack.items[0].external_urls.spotify
      );
      const fetchAudio = await fetch(downloadData.link).then((res) =>
        res.buffer()
      );
      const fetchImg = await fetch(
        searchTrack.items[0].album.images[0].url
      ).then((res) => res.buffer());
      const metadataAudio = tags(
        searchTrack.items[0].name,
        searchTrack.items[0].artists.map((art) => art.name).join(", "),
        searchTrack.items[0].album.release_date,
        searchTrack.items[0].album.name,
        fetchImg,
        searchTrack.items[0].track_number
      );
      const audioBuff = await nodeID3.write(metadataAudio, fetchAudio);
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
          releasedDate: searchTrack.items[0].album.release_date,
        },
        imageUrl: downloadData.metadata.cover,
        audioBuffer: audioBuff,
      };
      return result;
    } catch (err) {
      result = {
        status: false,
        message: "Unknown error occurred!\n\n" + String(err),
      };
      console.log(result);
      return result;
    }
  }
}

module.exports = {
  getOriginalUrl,
  search,
  downloadTrack,
  downloads,
};
