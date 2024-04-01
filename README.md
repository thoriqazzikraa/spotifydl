<p>Simple Scraper Spotify Downloader from <a href ="https://spotifydown.com/id">SpotifyDown</a></p>

## Installation

```sh
> npm i @nechlophomeriaa/spotifydl
```

## Usage

```js
const {
  getOriginalUrl,
  search,
  downloads,
  downloads2,
  downloadAlbum,
  downloadAlbum2,
  downloadTrack,
  downloadTrack2
  } = require("@nechlophomeriaa/spotifydl")
```

## Search Function

```js
(async () => {
  const searchTrack = await search(query, limit) //
  console.log(searchTrack)
  // Promise will be return an Array
})

/*
Example: {

(async () => {
const searchTrack = await search("summer salt tidal waves", 5)
console.log(searchTrack)
})

}
*/
```

## Download Single Track Function

```js
// Input Metadata: ✅
(async () => {
  const downTrack = await downloadTrack(song) // query || url
  console.log(downTrack)
})
/*
Example Output: {

{
  status: true,
  title: 'Someone To Spend Time With',
  artists: 'Los Retros',
  duration: '00:02:53',
  explicit: false,
  popularity: 73,
  url: 'https://open.spotify.com/track/6SE4JAo7T8C7XkFka5bbga',
  album: {
    name: 'Someone To Spend Time With',
    type: 'single',
    tracks: 1,
    releasedDate: '2019-02-12'
  },
  imageUrl: 'https://i.scdn.co/image/ab67616d0000b273a1f060b534d1d9c859acc73f',
  audioBuffer: <Buffer 49 44 33 03 00 00 03 28 70 58 54 49 54 32 00 00 00 37 00 00 01 ff fe 53 00 6f 00 6d 00 65 00 6f 00 6e 00 65 00 20 00 54 00 6f 00 20 00 53 00 70 00 65 ... 13922160 more bytes>
}

}
*/
```

## Download Albums Function

```js
// Supports: Album/Playlist
// Input Metadata: ✅
(async () => {
  const downAlbums = await downloadAlbum(url)
  console.log(downAlbums)
})
/*
Example Output: {

{
  type: 'album',
  metadata: {
    cache: true,
    success: true,
    artists: 'Bubble Tea and Cigarettes',
    title: "There's Nothing But Pleasure",
    cover: 'https://i.scdn.co/image/ab67616d0000b273c7dd8b1a8ff4ee3f89676686',
    releaseDate: '2022-09-02'
  },
  trackList: [
    {
      success: true,
      metadata: [Object],
      audioBuffer: <Buffer 49 44 33 03 00 00 03 7e 20 3e 54 49 54 32 00 00 00 3b 00 00 01 ff fe 54 00 68 00 65 00 72 00 65 00 27 00 73 00 20 00 4e 00 6f 00 74 00 68 00 69 00 6e ... 16719638 more bytes>
    },
    {
      success: true,
      metadata: [Object],
      audioBuffer: <Buffer 49 44 33 03 00 00 06 3e 43 72 54 49 54 32 00 00 00 6f 00 00 01 ff fe 47 00 6f 00 20 00 44 00 6f 00 77 00 6e 00 73 00 74 00 61 00 69 00 72 00 73 00 20 ... 27214410 more bytes>
    },
    {
      success: true,
      metadata: [Object],
      audioBuffer: <Buffer 49 44 33 03 00 00 06 49 5b 5e 54 49 54 32 00 00 00 1b 00 00 01 ff fe 53 00 61 00 6e 00 74 00 61 00 20 00 4d 00 6f 00 6e 00 69 00 63 00 61 00 54 50 45 ... 27581046 more bytes>
    },
    {
      success: true,
      metadata: [Object],
      audioBuffer: <Buffer 49 44 33 03 00 00 03 68 67 22 54 49 54 32 00 00 00 1f 00 00 01 ff fe 43 00 69 00 67 00 61 00 72 00 65 00 74 00 74 00 65 00 20 00 42 00 75 00 74 00 74 ... 16016890 more bytes>
    },
    {
      success: true,
      metadata: [Object],
      audioBuffer: <Buffer 49 44 33 03 00 00 05 40 2f 4c 54 49 54 32 00 00 00 09 00 00 01 ff fe 4c 00 69 00 7a 00 54 50 45 31 00 00 00 35 00 00 01 ff fe 42 00 75 00 62 00 62 00 ... 23080548 more bytes>
    },
    {
      success: true,
      metadata: [Object],
      audioBuffer: <Buffer 49 44 33 03 00 00 03 3b 6e 7c 54 49 54 32 00 00 00 39 00 00 01 ff fe 48 00 65 00 20 00 41 00 73 00 6b 00 65 00 64 00 20 00 4d 00 65 00 20 00 74 00 6f ... 14544276 more bytes>
    },
    {
      success: true,
      metadata: [Object],
      audioBuffer: <Buffer 49 44 33 03 00 00 05 7b 5d 0e 54 49 54 32 00 00 00 0b 00 00 01 ff fe 4c 00 65 00 61 00 70 00 54 50 45 31 00 00 00 35 00 00 01 ff fe 42 00 75 00 62 00 ... 25025510 more bytes>
    },
    {
      success: true,
      metadata: [Object],
      audioBuffer: <Buffer 49 44 33 03 00 00 06 41 14 70 54 49 54 32 00 00 00 2d 00 00 01 ff fe 35 00 41 00 4d 00 20 00 45 00 6d 00 70 00 61 00 6e 00 61 00 64 00 61 00 20 00 77 ... 27300744 more bytes>
    }
  ]
}

}
*/
```

<p align="center">If there is bug/error please make an issue!</p>
