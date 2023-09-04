const id3 = require("node-id3");
const { ytmp3 } = require("@nechlophomeriaa/ytdl");
const { isUrl, tags } = require("./function");
const spot = require("spotify-finder");
const spotify = new spot({
  consumer: {
    key: "271f6e790fb943cdb34679a4adcc34cc",
    secret: "c009525564304209b7d8b705c28fd294",
  },
});
const { getTrack } = require("spottydl");
const fetch = require("node-fetch");

async function search(query, limit) {
  if (isUrl(query)) throw new Error("search function not support for url");
  const limits = limit ? limit : 1;
  const data = await spotify.search({ q: query, type: "track", limit: limits });
  return data.tracks;
}

async function downloadTrack(song) {
  if (isUrl(song)) {
    try {
      const tracks = await spotify.getTrack(
        song.split("track/")[1].split("?")[0]
      );
      const tracks2 = await getTrack(song);
      const bufferImage = await fetch(tracks.album.images[0].url).then((res) =>
        res.buffer()
      );
      const audio = await ytmp3(`https://youtu.be/${tracks2.id}`);
      const fetchAudio = await fetch(audio.url).then((res) => res.buffer());
      let tagger = tags(
        tracks2.title,
        tracks2.artist,
        tracks2.year,
        tracks2.album,
        bufferImage,
        tracks2.trackNumber
      );
      const nodeID3 = await id3.write(tagger, fetchAudio);
      const result = {
        status: true,
        title: tracks2.title,
        artist: tracks2.artist,
        uploadDate: tracks2.year,
        album: tracks2.album,
        size: audio.size,
        duration: audio.duration,
        thumbnail: tracks.album.images[0].url,
        audioBuffer: nodeID3,
      };
      return result;
    } catch (err) {
      const result = {
        status: false,
        message: `Unknown error occurred\n\n${String(err)}`,
      };
      console.log(err);
      return result;
    }
  } else {
    try {
      const findTracks = await search(song, 1);
      const getTrackInfo = await getTrack(
        findTracks.items[0].external_urls.spotify
      );
      const bufferImage = await fetch(
        findTracks.items[0].album.images[0].url
      ).then((res) => res.buffer());
      const audio = await ytmp3(`https://youtu.be/${getTrackInfo.id}`);
      const fetchAudio = await fetch(audio.url).then((res) => res.buffer());
      const tagger = tags(
        getTrackInfo.title,
        getTrackInfo.artist,
        getTrackInfo.year,
        getTrackInfo.album,
        bufferImage,
        getTrackInfo.trackNumber
      );
      const nodeID3 = await id3.write(tagger, fetchAudio);
      const result = {
        status: true,
        title: getTrackInfo.title,
        artist: getTrackInfo.artist,
        uploadDate: getTrackInfo.year,
        album: getTrackInfo.album,
        size: audio.size,
        duration: audio.duration,
        thumbnail: findTracks.items[0].album.images[0].url,
        audioBuffer: nodeID3,
      };
      return result;
    } catch (err) {
      const result = {
        status: false,
        message: `Unknown error occurred\n\n${String(err)}`,
      };
      console.log(err);
      return result;
    }
  }
}

module.exports = {
  search,
  downloadTrack,
};
