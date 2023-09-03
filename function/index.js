function isUrl(url) {
  return url.match(
    new RegExp(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi
    )
  );
}

function tags(title, artist, year, album, image, track) {
  const result = {
    title: title,
    artist: artist,
    year: year,
    album: album,
    image: {
      description: "Front cover",
      imageBuffer: image,
    },
    track: track,
  };
  return result;
}

module.exports = { isUrl, tags };
