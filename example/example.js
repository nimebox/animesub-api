const animesub = require('../index.js')
const title = 'boruto'
const filename = 'boruto_napisy' // output boruto_napisy.zip
const titletype = {
  org: 'org', // oryginalny tytuł
  pl: 'pl', // polski tytuł
  en: 'en' // angielski tytuł
}

// id from 0 to 7
let id = 1

animesub.download(title, titletype.org, id, filename)
