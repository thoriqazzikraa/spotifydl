<p>Simple Scraper Spotify Downloader from <a href ="https://spotifydown.com/id">SpotifyDown</a></p>

## Installation

```sh
> npm i @nechlophomeriaa/spotifydl
```

## Usage

```js
const { search, downloadTrack, downloadAlbum, downloads, getOriginalUrl } = require("@nechlophomeriaa/spotifydl")
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
  title: 'Acid Wash Ocean',
  artists: 'Dreamgirl',
  duration: '00:02:13',
  explicit: false,
  popularity: 37,
  url: 'https://open.spotify.com/track/2D5QfU6vhWVCN5xKv5ZniT',
  album: {
    name: 'Illuminaughty',
    type: 'single',
    tracks: 6,
    releasedDate: '2015-02-14'
  },
  imageUrl: 'https://i.scdn.co/image/ab67616d0000b27377cbc6b59d5190717afa04aa',
  audioUrl: 'https://cdn---02---dl.ytapis.com/dl?hash=HDXr7hj8l0my%2BWkfR4ao6ujYcd7N61%2FATvLi368BTyZGUrsIPbz5tSKzhhi5rOVmqflg8ZGn5NsdCJKvvp9pksqGbizGN5xBwKWtuVu%2F2VMlgX5Bq1r93h%2BROgeVDishuDj9eRjDDOrJmO3yNUxadiZNEQyKLjO4rPI5%2FeonTvAn19aYB2o%2FpvmzviG%2FWz%2F9'
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
  type: 'playlist',
  metadata: {
    cache: true,
    success: true,
    artists: 'Thoriq Azzikra',
    title: 'alternative indie',
    cover: 'https://i.scdn.co/image/ab67706c0000bebb5f0b754337dfe9506a18401c',
    releaseDate: null
  },
  trackList: [
    {
      success: true,
      metadata: [Object],
      link: 'https://dll2.yt2api.com/dl?hash=a3%2FcckOmcwfknwenf%2Fqt%2By%2BtN405OR2FLtUUiZ%2FWVpqUXFdCSAm61EJuUiVl9urm8HTrORoLlrjXnxmDOYgs7k13OxKunm%2BhcSP7SY%2BCN2ChZVI7Xc3XRUrj%2FNgsz6cVe6Nc2tR7qlHXYjL%2F0zFDwIbKjrZv3VdllcLdGjzsa6iJqBuKh%2FuL8CCfC1BNrRwYITXq9BMET9U02dL%2Fsa%2B%2F7A%3D%3D'
    },
    {
      success: true,
      metadata: [Object],
      link: 'https://dl--04--cdn.ytapis.com/dl?hash=JaBY%2BP%2FA4B8ZK0t%2B64ciKQ9eStFzQneyXchmqat5c5REDukuzT34x12peIS4lw5lVd0as6E52rd0HnaNOfKInrDh1mKhIbtP07Z5FNdTIg34VPF%2FsrVlsxIDYEJDJjRdhgAd84MKD85bMtIR94P74rqPus7%2FyvbHEs4eegph7ELk9hjzbuB8GCsys4drrSgo'
    },
    {
      success: true,
      metadata: [Object],
      link: 'https://dl--06--cdn.ytapis.com/dl?hash=aX7MietFI1%2Fy6%2FFmrdGDfsyYRV2EagEdRfCAHOaAFpGC0GlPXFDwJXICepk1EcF51Qd9DXfjsHFecjjHL%2FcPbNoYg%2BWwUbI%2BbNsCHF%2Fy0RFgPBImnxJj63ZH%2FxgJrIkrHgS1SG%2FIZhmlHbvwW9%2BEWNMS5xE%2BzEc4bmMXAoElJ7Ca0FuBWY2LZRII4js05w717Vhrzx9CMOThEWx%2B0%2FZI5GAlRDgsiVyKWsCuwFTzIDM%3D'
    },
    {
      success: true,
      metadata: [Object],
      link: 'https://dll1.yt2api.com/dl?hash=QdOq8HKI5A8GxPCoqM5gi2MoXx8XIQVraiR8B6JQMvPm%2FPo%2FgXomXX3fAk3fWWdO79JNUY16szGThkchWf6ijOnkmJ9TKN0dLooBp8%2FMpzHg1UFNa5LyIMGOrHzCR9RExnGiH%2FidE1CsAqW2ZibDMwLvUMC060B1yPeJeWkpsSj3yQCdCQbfiLOjyuWHk1qK6r3V6nYikE8IUWgMjcYzzg%3D%3D'
    },
    {
      success: true,
      metadata: [Object],
      link: 'https://dl--03--cdn.ytapis.com/dl?hash=tZiJprp4eW55vbhyznedtd5mx4iyDOe7Qqpq4kQZp%2BGP6fJifIHKa9stqSYv7z9Pe2x6XlaER6wm8CTz594Zf0Bpr6e7vPKgzKhiaDK2pgTG9NaE18A%2Fd31R6uN9pVfhzFC4vPEqfflwLqO5koj9CFWazqDXv%2FMNpw9%2FOGnWQx02JmqWOtMo6lcVIKNI7Hcr'
    }
  ]
}

}
*/
```

<p align="center">If there is bug/error please make an issue!</p>
