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
Example Output:

{
  status: true,
  title: 'Be More',
  artist: 'Stephen Sanchez',
  uploadDate: '2023-8-3',
  album: 'Be More',
  size: '3.6 MB',
  duration: '00:03:52',
  thumbnail: 'https://i.scdn.co/image/ab67616d0000b273d8623313343c12b4b46f8235',
  audioBuffer: <Buffer 49 44 33 03 00 00 00 09 08 29 54 49 54 32 00 00 00 11 00 00 01 ff fe 42 00 65 00 20 00 4d 00 6f 00 72 00 65 00 54 50 45 31 00 00 00 21 00 00 01 ff fe ... 3857031 more bytes>
}
*/
```

If there is bug/error please make an issue!


