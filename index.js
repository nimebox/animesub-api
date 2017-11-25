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

const download = async (id, sh, path) => {
  const response = await api.post(DOWNLOAD_URL, qs.stringify({id: id, sh: sh}), {responseType: 'arraybuffer'}).catch(error => { console.error(error) })
  return new Promise((resolve, reject) => {
    if (response.headers['content-type'] === 'application/zip') {
      fs.writeFile(path, response.data, (err) => {
        if (err) {
          reject(err)
        }
        resolve(`${path} written!`)
      })
    } else {
      reject(console.error('content-type must be application/zip'))
    }
  })
}

const search = async (title, titletype) => {
  const response = await api.get(SEARCH_URL + title + '&pTitle=' + titletype).catch(error => { console.error(error) })
  return new Promise((resolve, reject) => {
    x(response.data,
      {
        value: ['input@value'],
        title: ['tr[class=KNap] > td[width="45%"]']
      }
    )((err, obj) => {
      if (err) {
        reject(err)
      }
      const queries = _.without(obj.value, 'ok', '1', 'Zaloguj si�', 'Szukaj', 'Szukaj napis�w', 'Pobierz napisy')
      queries.splice(0, 4)
      const out = obj.title.map((el, i) => {
        if (i === 0) {
          i = 0
        } else { i *= 2 }
        return ({
          title: el,
          id: queries[i],
          sh: queries[i + 1]
        })
      })
      resolve(out)
    })
  })
}

module.exports = {
  download,
  search
}
