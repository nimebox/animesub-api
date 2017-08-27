const fs = require('fs')
const x = require('x-ray')()
const axios = require('axios')
const axiosCookieJarSupport = require('@3846masa/axios-cookiejar-support')
const tough = require('tough-cookie')
const qs = require('querystring')
const _ = require('lodash')

const cookieJar = new tough.CookieJar()
axiosCookieJarSupport(axios)

const api = axios.create({
  jar: cookieJar,
  withCredentials: true
})

const DOWNLOAD_URL = 'http://animesub.info/sciagnij.php'
const SEARCH_URL = 'http://animesub.info/szukaj.php?szukane='

const download = (title, titletype, id, filename) => {
  api.get(SEARCH_URL + title + '&pTitle=' + titletype)
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
    api.get(SEARCH_URL + title + '&pTitle=' + titletype)
      .then(function (response) {
        x(response.data,
          {
            value: ['input@value'],
            title: ['tr[class=KNap] > td[width="45%"]']
          }
        )(function (err, obj) {
          if (err) {
            console.log('Can\'t scrape: ' + err)
          }
          let out = []
          let titles = obj.title
          let queries = obj.value
          queries = _.without(queries, 'ok', '1', 'Zaloguj si�', 'Szukaj', 'Szukaj napis�w', 'Pobierz napisy')
          queries.splice(0, 4)

          titles.map((el, i) => {
            if (i === 0) {
              i = 0
            } else { i *= 2 }
            out.push({
              title: el,
              id: queries[i],
              sh: queries[i + 1]
            })
          })
          resolve(JSON.stringify(out, 4, '\t'))
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
