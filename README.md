# Animesub-api
Unofficial api for
http://animesub.info

## Install animesub-api
    npm install animesub-api --save
    
## Usage
### Download subtitles

```javascript
const animesub = require('animesub-api')
const title = 'boruto'
const path = 'boruto_napisy.zip' // output boruto_napisy.zip
const titletype = {
  org: 'org', // oryginalny tytuł
  pl: 'pl', // polski tytuł
  en: 'en' // angielski tytuł
}
const id = 1
// Search and download
animesub.search(title, titletype.org)
  .then(data => {
    console.log(data)
    animesub.download(data.json[0].id, data.json[0].sh, path)
      .then(log => console.log(log))
      .catch(err => console.log(err))
  }).catch(err => console.log(err))

```
### Search

```javascript
const animesub = require('animesub-api')
const title = 'shokugeki no souma'
const titletype = {
  org: 'org', // oryginalny tytuł
  pl: 'pl', // polski tytuł
  en: 'en' // angielski tytuł
}

animesub.search(title, titletype.org).then((data) => {
  console.log(data)
}).catch((err) => {
  console.log(err)
})

```

```js
{
  page: 0,
  json: [
    { title: 'Shokugeki no Souma: Ni no Sara ep01',
      id: '61211',
      sh: '8cb865e5e82d2a1d2d10487674ac4f9369dac8b3' },
    { title: 'Shokugeki no Souma: Ni no Sara ep01',
      id: '61220',
      sh: 'c66d9ba7b90bfa706e845b82c1e92744ab5c6196' }
  ]
}
```


