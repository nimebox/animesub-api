const axios = require('axios')
const axiosCookieJarSupport = require('@3846masa/axios-cookiejar-support').default
const tough = require('tough-cookie')
const qs = require('qs')
const words = require('lodash.words')
const without = require('lodash.without')
const cookieJar = new tough.CookieJar()
const { JSDOM } = require('jsdom')

axios.defaults.adapter = require('axios/lib/adapters/http')
axiosCookieJarSupport(axios)

const config = {
  baseURL: 'http://animesub.info',
  jar: cookieJar,
  withCredentials: true
}

const api = axios.create(config)

const DOWNLOAD_URL = '/sciagnij.php'
const SEARCH_URL = '/szukaj.php?szukane='
const download = async (id, sh) => {
  try {
    const response = await api.post(
      DOWNLOAD_URL,
      qs.stringify({ id: id, sh: sh }),
      { responseType: 'arraybuffer' }
    )
    if (response.headers['content-type'] !== 'application/zip') {
      throw new Error('content-type must be application/zip')
    }
    return response.data
  } catch (err) {
    console.error(err)
  }
}

const search = async (title, titletype, page) => {
  try {
    if (!page) {
      page = 0
    }
    const { data } = await api.get(
      `${SEARCH_URL}${title}&pTitle=${titletype}&od=${page}`
    )

    const doc = new JSDOM(data).window.document

    const obj = {
      input: [...doc.querySelectorAll('input')],
      title: [...doc.querySelectorAll('tr[class="KNap"] > td[width="45%"]')],
      added: [...doc.querySelectorAll('tr[class="KNap"] > td[width="25%"]')],
      format: [...doc.querySelectorAll('tr[class="KNap"] > td[width="20%"]')],
      user: [...doc.querySelectorAll('tr[class="KNap"] > td > a')],
      description: [
        ...doc.querySelectorAll('tr[class="KKom"] > td[class="KNap"]')
      ],
      pages: doc.querySelector('td[class="MaleLtr"]:nth-of-type(1)')
    }

    const inputs = obj.input.map(el => el.value)
    const queries = without(
      inputs,
      'ok',
      '1',
      'Zaloguj si�',
      'Szukaj',
      'Szukaj napis�w',
      'Pobierz napisy'
    )
    queries.splice(0, 4)

    const added = obj.added.map(el => el.innerHTML)
    const format = obj.format.map(el => el.innerHTML)
    const user = obj.user.map(el => el.innerHTML.substring(1))
    const description = obj.description

    let si = 0
    const out = obj.title.map((el, i) => {
      if (i === 0) {
        i = 0
      } else {
        i *= 2
      }
      si = si + 1
      return {
        title: el.innerHTML,
        added: added[i] || '',
        format: format[i] || '',
        user: user[i] || '',
        description: description[si - 1].innerHTML || '',
        id: queries[i],
        sh: queries[i + 1]
      }
    })
    const pages = words(obj.pages.innerHTML)
    pages.splice(0, 2)

    return {
      pages: Math.floor(pages[0] / 30),
      page: page,
      json: out
    }
  } catch (err) {
    console.error(err)
  }
}

module.exports = {
  download,
  search
}
