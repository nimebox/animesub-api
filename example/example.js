const animesub = require('../index.js')
const title = 'boruto'
const path = 'boruto_napisy.zip' // output boruto_napisy.zip
const titletype = {
  org: 'org', // oryginalny tytuł
  pl: 'pl', // polski tytuł
  en: 'en' // angielski tytuł
}
// Search and download
animesub.search(title, titletype.org)
  .then(data => {
    console.log(data)
    animesub.download(data[0].id, data[0].sh, path)
      .then(log => console.log(log))
      .catch(err => console.error(err))
  }).catch(err => console.error(err))
