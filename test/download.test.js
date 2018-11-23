jest.setTimeout(100000)
const fs = require('fs')
const animesub = require('../src/index')
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

    expect(data).toBeDefined()
    expect(data.pages).toBeDefined()
    expect(data.page).toBeDefined()
    expect(data.json).toBeDefined()
    expect(data.json[0].title).toBeDefined()
    expect(data.json[0].id).toBeDefined()
    expect(data.json[0].sh).toBeDefined()
    expect(data.json[0].added).toBeDefined()
    expect(data.json[0].format).toBeDefined()
    expect(data.json[0].user).toBeDefined()
    expect(data.json[0].description).toBeDefined()

    const file = await animesub.download(data.json[0].id, data.json[0].sh)
    expect(fs.writeFileSync(path, file)).not.toBeNull()
  })
})

afterEach(() => {
  fs.unlinkSync(path)
})
