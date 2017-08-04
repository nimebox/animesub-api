let fs = require('fs')
let x = require('x-ray')()
let axios = require('axios')
const axiosCookieJarSupport = require('@3846masa/axios-cookiejar-support')
const tough = require('tough-cookie')
axiosCookieJarSupport(axios)
const cookieJar = new tough.CookieJar()
let qs = require('querystring')
let _ = require('lodash')

let api = axios.create({
  jar: cookieJar,
  withCredentials: true
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

        let array = obj.value
        array = _.without(array, 'ok', '1', 'Zaloguj si�', 'Szukaj', 'Szukaj napis�w', 'Pobierz napisy')

        array.splice(0, 4)
        console.log('All values: ' + array)

        if (id === 0) {
          id = 0
        } else { id *= 2 }

        const QUERY = {
          id: array[id],
          sh: array[id + 1]
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

const search = (title, titletype) => {
  return new Promise((resolve, reject) => {
    api.get('http://animesub.info/szukaj.php?szukane=' + title + '&pTitle=' + titletype)
      .then(function (response) {
        x(response.data,
          {
            title: ['tr[class=KNap] > td[width="45%"]']
          }
        )(function (err, obj) {
          if (err) {
            console.log('Can\'t scrape: ' + err)
          }
          let titles = _.uniqWith(obj.title, _.isEqual)
          resolve(titles)
        })
      })
      .catch(function (error) {
        reject(error)
      })
  })
}

module.exports = {
  download,
  search
}
