const animesub = require('../index.js')

// 1,,,ok,Zaloguj si�,,Szukaj,boruto,Szukaj napis�w,63072,a2b6a0f69b429902117c279e5a7c3a866412fe49,Pobierz napisy,63108,5ade033d2dd41bf1139186c57356d18a86cd44f0,Pobierz napisy,63317,bde916a1b94b68151b05b4f929bb2af4cb0c0330,Pobierz napisy,63328,d37437bf71eb50741d36f81d57fa24e2f1adcffa,Pobierz napisy,63418,fccfa09ab3be8bc0667612731596781cf62b4a16,Pobierz napisy,63454,e29a547218e83ec43fec03dda36665dc4e848885,Pobierz napisy,63455,6fa1270a94a3734eac43d74f474e11396eb7e13b,Pobierz napisy,63485,db53395c998a05341d09c10ebc8038aa78f96492,Pobierz napisy
// 9 = id = '63072'
// 10 = sh = 'a2b6a0f69b429902117c279e5a7c3a866412fe49'
// 11 = single_file = 'Pobierz napisy

const title = 'boruto'
const filename = 'file'
const titletype = {
  org: 'org'
}

const QUERY = {
  id: 12,
  sh: 13
}

animesub.download(title, titletype.org, QUERY.id, QUERY.sh, filename)
