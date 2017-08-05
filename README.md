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
const filename = 'boruto_napisy' // output boruto_napisy.zip
const titletype = {
  org: 'org', // oryginalny tytuł
  pl: 'pl', // polski tytuł
  en: 'en' // angielski tytuł
}

let id = 1

animesub.download(title, titletype.org, id, filename)

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

animesub.search(title, titletype.org).then(({titles, queries}) => {
  console.log(titles)
  console.log(queries) // first index[0] = id, second index[1] = sh
}).catch((err) => {
  console.log(err)
})

```
or see example: https://github.com/xdk78/animesub-api/tree/master/example
