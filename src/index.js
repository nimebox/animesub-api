const fs = require('fs')
const axios = require('axios')
const axiosCookieJarSupport = require('@3846masa/axios-cookiejar-support').default
const tough = require('tough-cookie')
const qs = require('qs')
const _ = require('lodash')
const grabbi = require('grabbi')
axios.defaults.adapter = require('axios/lib/adapters/http')
const cookieJar = new tough.CookieJar()
axiosCookieJarSupport(axios)

const config = {
  baseURL: 'http://animesub.info',
  jar: cookieJar,
  withCredentials: true
}
const api = axios.create(config)

const DOWNLOAD_URL = '/sciagnij.php'
const SEARCH_URL = '/szukaj.php?szukane='
const download = async (id, sh, path) => {
  const response = await api.post(DOWNLOAD_URL, qs.stringify({id: id, sh: sh}), {responseType: 'arraybuffer'}).catch(error => { console.error(error) })
  return new Promise((resolve, reject) => {
    if (response.headers['content-type'] === 'application/zip') {
      fs.writeFile(path, response.data, (err) => {
        if (err) {
          reject(new Error(err))
        }
        resolve(`${path} written!`)
      })
    } else {
      reject(new Error('content-type must be application/zip'))
    }
  })
}

const search = async (title, titletype, page) => {
  try {
    if (page === undefined || page === null) {
      page = 0
    }
    const { doc } = await grabbi(SEARCH_URL + title + '&pTitle=' + titletype + '&od=' + page, config)
    const obj = {
      input: [...doc.querySelectorAll('input')],
      title: [...doc.querySelectorAll('tr[class="KNap"] > td[width="45%"]')],
      pages: doc.querySelector('td[class="MaleLtr"]:nth-of-type(1)')
    }
    const inputs = obj.input.map(el => el.value)
    const queries = _.without(inputs, 'ok', '1', 'Zaloguj si�', 'Szukaj', 'Szukaj napis�w', 'Pobierz napisy')
    queries.splice(0, 4)
    const out = obj.title.map((el, i) => {
      if (i === 0) {
        i = 0
      } else { i *= 2 }
      return ({
        title: el.innerHTML,
        id: queries[i],
        sh: queries[i + 1]
      })
    })
    const pages = _.words(obj.pages.innerHTML)
    pages.splice(0, 2)
    const data = {
      pages: Math.floor(pages[0] / 30),
      page: page,
      json: out
    }
    return data
  } catch (err) {
    return new Error(err)
  }
}

module.exports = {
  download,
  search
}
