# Usage
`const { search, downloadTrack } = require("@nechlophomeriaa/spotifydl")`

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

## Download Function
```js
(async () => {
const downTrack = await downloadTrack(song) // query || url
console.log(downTrack)
})
/*
Example Output: {

{
  status: true,
  title: 'Teenage Blue',
  artists: 'Dreamgirl',
  duration: '00:03:54',
  explicit: false,
  popularity: 61,
  url: 'https://open.spotify.com/track/6oWXWkwHKREYlBNuBCitFP',
  album: {
    name: 'Illuminaughty',
    type: 'single',
    tracks: 6,
    releasedDate: '2015-02-14'
  },
  imageUrl: 'https://i.scdn.co/image/ab67616d0000b27377cbc6b59d5190717afa04aa',
  audioBuffer: <Buffer 49 44 33 03 00 00 00 0e 69 03 54 49 54 32 00 00 00 1b 00 00 01 ff fe 54 00 65 00 65 00 6e 00 61 00 67 00 65 00 20 00 42 00 6c 00 75 00 65 00 54 50 45 ... 9644059 more bytes>
}

}
*/
```

If there is bug/error please make an issue!


