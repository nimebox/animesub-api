let fs = require('fs')
let x = require('x-ray')()
let axios = require('axios')
const axiosCookieJarSupport = require('@3846masa/axios-cookiejar-support')
const tough = require('tough-cookie')
axiosCookieJarSupport(axios)
const cookieJar = new tough.CookieJar()
let qs = require('querystring')

let api = axios.create({
  // baseURL: 'http://animesub.info/szukaj.php?szukane=boruto&pTitle=org',
  jar: cookieJar, // tough.CookieJar or boolean
  withCredentials: true // If true, send cookie stored in jar
})

// let SEARCH_URL = 'http://animesub.info/szukaj.php?szukane=boruto&pTitle=org'
// let title = 'boruto'
// let title_type ='org'

const DOWNLOAD_URL = 'http://animesub.info/sciagnij.php'

const download = (title, titletype, id, sh, filename) => {
  api.get('http://animesub.info/szukaj.php?szukane=' + title + '&pTitle=' + titletype)
    .then(function (response) {
      console.log('\n GET')
      console.log(response.headers)
      x(response.data,
        {
          value: ['input@value']
        }
      )(function (err, obj) {
        if (err) {
          console.log(err)
        }
        console.log(obj.value + '\n' + 'id: ' + obj.value[12] + '\n' + 'value: ' + obj.value[13])

        // 1,,,ok,Zaloguj si�,,Szukaj,boruto,Szukaj napis�w,63072,a2b6a0f69b429902117c279e5a7c3a866412fe49,Pobierz napisy,63108,5ade033d2dd41bf1139186c57356d18a86cd44f0,Pobierz napisy,63317,bde916a1b94b68151b05b4f929bb2af4cb0c0330,Pobierz napisy,63328,d37437bf71eb50741d36f81d57fa24e2f1adcffa,Pobierz napisy,63418,fccfa09ab3be8bc0667612731596781cf62b4a16,Pobierz napisy,63454,e29a547218e83ec43fec03dda36665dc4e848885,Pobierz napisy,63455,6fa1270a94a3734eac43d74f474e11396eb7e13b,Pobierz napisy,63485,db53395c998a05341d09c10ebc8038aa78f96492,Pobierz napisy
        // 9 = id = '63072'
        // 10 = sh = 'a2b6a0f69b429902117c279e5a7c3a866412fe49'
        // 11 = single_file = 'Pobierz napisy

        const QUERY = {
          id: obj.value[id],
          sh: obj.value[sh]
        }

        api.post(DOWNLOAD_URL,
          qs.stringify({
            id: QUERY.id,
            sh: QUERY.sh
          }),
          {
            responseType: 'arraybuffer'
          }
        )
          .then(function (response) {
            console.log('\n POST')
            console.log(response.headers)
            fs.writeFile(filename + '.zip', response.data, function (err) {
              if (err) {
                console.log(err)
              }
              console.log(filename + '.zip' + ' written!')
            })
          })
          .catch(function (error) {
            console.log(error)
          })
      })
    })
    .catch(function (error) {
      console.log(error)
    })
}

module.exports = {
  download
}
