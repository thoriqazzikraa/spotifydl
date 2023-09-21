# Usage
```js
const { search, downloadTrack, downloadAlbum, downloads, getOriginalUrl } = require("@nechlophomeriaa/spotifydl")`

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

## Download Albums Function
```js
(async () => {
// Supports: Album/Playlist
// Input Metadata: ✅
const downAlbums = await downloadAlbum(url)
console.log(downAlbums)
})
/*
Example Output: {

[
  {
    success: true,
    metadata: {
      cache: true,
      success: true,
      id: '1JZEP7TQjgZjEuLS8AAV5P',
      artists: 'Bubble Tea and Cigarettes',
      title: "There's Nothing But Pleasure",
      album: "There's Nothing But Pleasure",
      cover: 'https://i.scdn.co/image/ab67616d0000b273c7dd8b1a8ff4ee3f89676686',
      isrc: 'ES6642200103',
      releaseDate: '2022-09-02'
    },
    link: 'https://dl--05--cdn.ytapis.com/dl?hash=MygUQlieutMUsT3AdpBF12r%2B22bomm3z8%2Bcl71lA06rTYeQq7emuuEEF0IjG57%2BCObcOfdslycOMaO98nlZtmQ5bmThcOdTJs27rpMIMvXwH2zsSr9O%2BXKBm0X97JGmuzvisWLTG1yhXX7hWpUIfPfKiIRFgofMgXg4x1RnHqEy%2BaOsR3MBFsHI%2BNHdd%2FE1pb1JWVGFXs3z0VOBjr3XYVQ%3D%3D'
  },
  {
    success: true,
    metadata: {
      cache: true,
      success: true,
      id: '2b80PivTvL54jviaohkHFw',
      artists: 'Bubble Tea and Cigarettes',
      title: 'Go Downstairs to the Blue Moon, Buy Some Fried Chicken',
      album: "There's Nothing But Pleasure",
      cover: 'https://i.scdn.co/image/ab67616d0000b273c7dd8b1a8ff4ee3f89676686',
      isrc: 'ES6642000112',
      releaseDate: '2022-09-02'
    },
    link: 'https://dl--05--cdn.ytapis.com/dl?hash=QgDkJTq2mV56q5xIzXWwIwbMDHfPMg2SLUikkzngEJ2ku%2BGbODdfFVdXxkVuMi%2FeBc6HAYmnl%2F7PBiO0rt3wl2ruv%2FV57OSJ1bYJLhrbHFWaiqgIkksqNF0ENK69z4YHnwya0G8DzsolrRqGdgJBQbHEPC6fV4O9XbvX2kp%2BkuVR3yLZK0NmR6orpaDsvE7Ex6Oc%2BspmpMQVGGzkqFnuFe0VgcdQv3saYAnWfjZVRUT0ylpeo07xlQnZiWNfGY3d'
  },
  {
    success: true,
    metadata: {
      cache: true,
      success: true,
      id: '39xjaG10Vuc1siATyqxNqZ',
      artists: 'Bubble Tea and Cigarettes',
      title: 'Santa Monica',
      album: "There's Nothing But Pleasure",
      cover: 'https://i.scdn.co/image/ab67616d0000b273c7dd8b1a8ff4ee3f89676686',
      isrc: 'ES6642100075',
      releaseDate: '2022-09-02'
    },
    link: 'https://dl--05--cdn.ytapis.com/dl?hash=mzfO9pZLRy9TNLJMk%2BjWNX%2F1AXC6XatTDfOeflc2REcxcrvuWn3KIjI0Ai2622VDU4NMBQTqH1j58EA4fNgQqq7BdvcaRMgjKAMqYLteUZ4kB%2BskH5SU8hRLA0HKwxKaZsLNQSVVvTsKgM142V18RUb5%2BvbkPvwv%2B77WArnD0qDsKgzAk2prrVDlO0VrfSxT'
  },
  {
    success: true,
    metadata: {
      cache: true,
      success: true,
      id: '6pKiW0lfEOlJEZA1fv5ItS',
      artists: 'Bubble Tea and Cigarettes',
      title: 'Cigarette Butt',
      album: "There's Nothing But Pleasure",
      cover: 'https://i.scdn.co/image/ab67616d0000b273c7dd8b1a8ff4ee3f89676686',
      isrc: 'ES6642200104',
      releaseDate: '2022-09-02'
    },
    link: 'https://dl--04--cdn.ytapis.com/dl?hash=D4A4slMUChyDEzG50J%2FuplX4sIKnsL%2Fi46OLMvvnzVpHqYEfWgqHAqTKLJzh0O6zFYYu6kVpbw4ZSKouxbxHHya1Lua6sC%2FMyVJybVwIEtal9ioYCzjrOwRQEFphudRl9TiXtvweLSH0IpZudeJ95HNEuYB8UUXYpLeeaoB1lnuvCNSPk8vB2CLmT4CskSO%2F'
  },
  {
    success: true,
    metadata: {
      cache: true,
      success: true,
      id: '6twViLiQLG2ZtqUrMs34l1',
      artists: 'Bubble Tea and Cigarettes',
      title: 'Liz',
      album: "There's Nothing But Pleasure",
      cover: 'https://i.scdn.co/image/ab67616d0000b273c7dd8b1a8ff4ee3f89676686',
      isrc: 'ES6642100131',
      releaseDate: '2022-09-02'
    },
    link: 'https://dl--04--cdn.ytapis.com/dl?hash=xP1XzdpGcUL0PQGOeVQ7Ho9Lj6qiHBu6qBaP94vBZaD0Aduzq1%2FkEqU2w%2FCf5V4DLCHdIXfEyI%2BYFDtzrjwyx4rcjnG5WG3r1%2BojZROUz6wM%2BwLh%2By22Zy6MRftPxTD6Ka%2B2mG%2B6cEAcwxOGDsIPkfIZx0kd1U3ijQkMiRoFImO5hkksYcJt9AVXOm24M9dw'
  },
  {
    success: true,
    metadata: {
      cache: true,
      success: true,
      id: '1CrzyYbSTUattgIzNMzL3u',
      artists: 'Bubble Tea and Cigarettes',
      title: 'He Asked Me to Quit Smoking',
      album: "There's Nothing But Pleasure",
      cover: 'https://i.scdn.co/image/ab67616d0000b273c7dd8b1a8ff4ee3f89676686',
      isrc: 'ES6642200105',
      releaseDate: '2022-09-02'
    },
    link: 'https://dl--01--cdn.ytapis.com/dl?hash=8W6dhWItTPdMYrBoI45PIbSP62VXyq%2FEYVfAVocIRUeCoWOCzOyE4cir8NgGA4n4VMILbDG7NVr83AM9x1qHWcFkWEd92o5641yTSJuLd0K70vQlyGo2CzkYsJftMeuuVepuP%2BEd9pTP%2F84XNZnU1xLoPmMIygLfIwubjR0CUvk8rOzozMa2eQaDnZ84rQeXkBSDANEI%2F43r3G6PKVVMJg%3D%3D'
  },
  {
    success: true,
    metadata: {
      cache: true,
      success: true,
      id: '1RtSIWsNiBhwvozGOi6Rfo',
      artists: 'Bubble Tea and Cigarettes',
      title: 'Leap',
      album: "There's Nothing But Pleasure",
      cover: 'https://i.scdn.co/image/ab67616d0000b273c7dd8b1a8ff4ee3f89676686',
      isrc: 'ES6642200091',
      releaseDate: '2022-09-02'
    },
    link: 'https://dl--03--cdn.ytapis.com/dl?hash=hgadfAaifFv8s74YKf9kBGyUk6kMQ%2Bq75YX8K1h59zqVlorRfCEA6plmoKpo69wTjU%2B6SXKYl4%2F1eysmBAnd2rWg06tUAD%2F74juH45WpaFv03pK%2BE5yD4iAaoV3MbrHzX%2F5O5f8PaZjiEElZD5CEhmB5q74cWv%2FQLXjxo%2FEXeE0CbElkq6oMKC%2BfqVPnmD04'
  },
  {
    success: true,
    metadata: {
      cache: true,
      success: true,
      id: '5zotLA21Q8MnILdUxBEPRM',
      artists: 'Bubble Tea and Cigarettes',
      title: '5AM Empanada with You',
      album: "There's Nothing But Pleasure",
      cover: 'https://i.scdn.co/image/ab67616d0000b273c7dd8b1a8ff4ee3f89676686',
      isrc: 'ES6642000111',
      releaseDate: '2022-09-02'
    },
    link: 'https://dll1.yt2api.com/dl?hash=%2BpsQfZte7w%2ByY1QWW200PlBX9y3wgqljWTcaYYpcg4aWIvWdTwf2FUbpYWX8aObjEnhqBXp%2BjqPElh7V2%2BPwtMqSylWNYd08InwhqEqjpgEXtipiJWmZ%2F1O083%2BJBvswCu9fXtnGk%2Bo0kJuuValSkKp3PzSOiF3PrUizPz2Wuybw1BLNVPgZ0siztlxeTMWfOhilvB8ZklHdisudMWCZbw%3D%3D'
  }
]
*/
```

If there is bug/error please make an issue!


