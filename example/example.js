const fs = require('fs')
const animesub = require('../src/index')
const title = 'naruto'
const path = 'naruto_napisy.zip' // output boruto_napisy.zip
const titletype = {
  org: 'org', // oryginalny tytuł
  pl: 'pl', // polski tytuł
  en: 'en' // angielski tytuł
}
const page = 0 // 0 - first, 1 - second ...

// Search and download
animesub.search(title, titletype.org, page)
  .then(data => {
    console.log(data)
    animesub.download(data.json[0].id, data.json[0].sh)
      .then(file => fs.writeFileSync(path, file))
      .catch(err => console.error(err))
  }).catch(err => console.error(err))
