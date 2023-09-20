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

if url includes https://spotify.link:

{
  status: true,
  title: 'So Long',
  artists: 'Steady Holiday',
  image: 'https://i.scdn.co/image/ab67616d0000b273d52195651e47f1b443e90429',
  url: 'https://dl.spotifymate.com/mdelta.123tokyo.xyz/get.php/2/91/nyp_Tnbgfdo.
mp3?cid=MmEwMTo0Zjg6YzAxMjozOWJlOjoxfE5BfERF&h=WH8FX1im9OjJQfXr4Weckw&s=16951869
70&n=SpotifyMate.com%20-%20So%20Long%20-%20Steady%20Holiday&cid2=ODEuMTcxLjI5LjE
2fE5MfFJJQUU3QzMwMTc5MkE4Mjgw&fn=1'
}

if url includes open.spotify.com || with query:

{
  status: true,
  title: 'Teenage Blue',
  artists: 'Dreamgirl',
  duration: '00:03:54',
  explicit: false,
  popularity: 62,
  url: 'https://open.spotify.com/track/6oWXWkwHKREYlBNuBCitFP',
  album: {
    name: 'Illuminaughty',
    type: 'single',
    tracks: 6,
    releasedDate: '2015-02-14'
  },
  imageUrl: 'https://i.scdn.co/image/ab67616d0000b27377cbc6b59d5190717afa04aa',
  downloadAudio: 'https://dl.spotifymate.com/mbeta.123tokyo.xyz/get.php/7/a1/JVD
mY_riDsc.mp3?cid=MmEwMTo0Zjg6YzAxMjozOWJlOjoxfE5BfERF&h=vcJatNsMz0NedmZOLxFnWA&s
=1695187304&n=SpotifyMate.com%20-%20Teenage%20Blue%20-%20Dreamgirl&cid2=ODEuMTcx
LjI5LjE2fE5MfFJJQUU3QzMwMTc5MkE4Mjgw&fn=1'
}

}
*/
```

If there is bug/error please make an issue!


