let fs = require('fs')
let x = require('x-ray')()
let axios = require('axios')
const axiosCookieJarSupport = require('@3846masa/axios-cookiejar-support')
const tough = require('tough-cookie')
axiosCookieJarSupport(axios)
const cookieJar = new tough.CookieJar()
let qs = require('querystring')

let api = axios.create({
  jar: cookieJar, // tough.CookieJar or boolean
  withCredentials: true // If true, send cookie stored in jar
})

const DOWNLOAD_URL = 'http://animesub.info/sciagnij.php'

const download = (title, titletype, id, filename) => {
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

        function removeA (arr) {
          let what, a, L, ax
          a = arguments
          L = a.length
          while (L > 1 && arr.length) {
            what = a[--L]
            while ((ax = arr.indexOf(what)) !== -1) {
              arr.splice(ax, 1)
            }
          }
          return arr
        }

        let array = obj.value
        removeA(array, 'ok', '1', 'Zaloguj si�', 'Szukaj', 'Szukaj napis�w', 'Pobierz napisy')
        array.splice(0, 4)
        console.log('All values: ' + array)

        if (id === 0) {
          id = 0
        } else { id *= 2 }

        const QUERY = {
          id: obj.value[id],
          sh: obj.value[id + 1]
        }

        console.log('id:' + QUERY.id, 'sh: ' + QUERY.sh)
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
