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
  title: 'So Long',
  artists: 'Steady Holiday',
  duration: '00:03:40',
  explicit: false,
  popularity: 33,
  url: 'https://open.spotify.com/track/3yTE6ycnJ6lL3UsCsMJr3F',
  album: {
    name: 'Under the Influence',
    type: 'album',
    tracks: 9,
    releasedDate: '2016-06-24'
  },
  imageUrl: 'https://i.scdn.co/image/ab67616d0000b273d52195651e47f1b443e90429',
  audioUrl: 'https://dll2.yt2api.com/dl?hash=H3jL9yVyZ7o%2Fj5cvjF3TvUPxgCG3M%2BBmBb1l48iaZSeJKruXR6WSU1EVNH%2F86ygCQsl65F7AI1ZQZBm6GawY8m3ByLRxGYjFrdGhvx8AZYpdVyBMR3K8vP2ZcP%2FSxegGCUarfnq%2BQL%2FDhp0L6z2lZ5BgcKZy85Hp5WO%2B3dnnyjBJ61tn1B9nBxocGlbAigEm'
}

}
*/
```

If there is bug/error please make an issue!


