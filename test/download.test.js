jest.setTimeout(100000)
const fs = require('fs')
const animesub = require('../src/index.js')
const title = 'naruto'
const path = 'naruto_napisy.zip' // output boruto_napisy.zip
const titletype = {
  org: 'org', // oryginalny tytuł
  pl: 'pl', // polski tytuł
  en: 'en' // angielski tytuł
}
const page = 0 // 0 - first, 1 - second ...

describe('DOWNLOAD anime subtitles', () => {
  it('should respond with zip file', async () => {
    const data = await animesub.search(title, titletype.org, page)

    expect(data).not.toBeNull()
    expect(data).not.toBeUndefined()
    expect(data.pages).not.toBeNull()
    expect(data.page).not.toBeNull()
    expect(data.json).not.toBeNull()
    expect(data.json[0].title).not.toBeNull()
    expect(data.json[0].id).not.toBeNull()
    expect(data.json[0].sh).not.toBeNull()
    const file = await animesub.download(data.json[0].id, data.json[0].sh)
    expect(fs.writeFileSync(path, file)).not.toBeNull()
  })
})

afterEach(() => {
  fs.unlinkSync(path)
})
