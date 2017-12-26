const fs = require('fs')
const x = require('x-ray')()
const axios = require('axios')
const axiosCookieJarSupport = require('@3846masa/axios-cookiejar-support')
const tough = require('tough-cookie')
const qs = require('querystring')
const _ = require('lodash')
axios.defaults.adapter = require('axios/lib/adapters/http')
const cookieJar = new tough.CookieJar()
axiosCookieJarSupport(axios)

const api = axios.create({
  baseURL: 'http://animesub.info',
  jar: cookieJar,
  withCredentials: true
})

const DOWNLOAD_URL = '/sciagnij.php'
const SEARCH_URL = '/szukaj.php?szukane='

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

const search = async (title, titletype, page) => {
  if (page === undefined || page === null) {
    page = 0
  }
  const response = await api.get(SEARCH_URL + title + '&pTitle=' + titletype + '&od=' + page).catch(error => { console.error(error) })
  return new Promise((resolve, reject) => {
    x(response.data,
      {
        value: ['input@value'],
        title: ['tr[class="KNap"] > td[width="45%"]'],
        pages: 'td[class="MaleLtr"]:nth-of-type(1)'
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
      const pages = _.words(obj.pages)
      pages.splice(0, 2)
      const outs = {
        pages: Math.floor(pages[0] / 30),
        page: page,
        json: out
      }
      resolve(outs)
    })
  })
}

module.exports = {
  download,
  search
}
