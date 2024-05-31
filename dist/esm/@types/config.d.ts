export type trackResultV1 = {
  status: Boolean,
  title: String,
  artists: String,
  duration: String,
  duration_ms: Number,
  explicit: Boolean,
  popularity: Number,
  url: String,
  album: {
    name: String,
    type: Single,
    tracks: Number,
    releaseDate: String
  },
  imageUrl: String,
  audioBuffer: Buffer
}

export type trackResultV2 = {
  status: Boolean,
  title: String,
  artists: String,
  duration: String,
  duration_ms: Number,
  explicit: Boolean,
  popularity: Number,
  url: String,
  album: {
    name: String,
    type: String,
    tracks: Number,
    releaseDate: String,
  },
  imageUrl: String,
  audioBuffer: Buffer
}

/*export type albumResultV1 = {
  type: String,
  metadata: {
    cache: Boolean,
    success: Boolean,
    artists: String,
    title: String,
    cover: String,
    releaseDate: String
  },
  trackList: [
    {
      success: Boolean,
      metadata: {
        
      },
      audioBuffer: Buffer
    }
    ]
}*/

export type albumResultV2 = {
  type: String,
  metadata: {
    title: String,
    artists: String,
    cover: String,
    releaseDate: String
  },
  trackList: [
    {
      success: Boolean,
      metadata: {
        time: String,
        artist: String,
        duration: Number,
        name: String,
        previewUrl: String,
        uri: String
      },
      audioBuffer: Buffer
    }
    ]
}