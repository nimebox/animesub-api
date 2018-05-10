jest.setTimeout(100000)

const animesub = require('../src/index.js')
const title = 'naruto'
const titletype = {
  org: 'org', // oryginalny tytuł
  pl: 'pl', // polski tytuł
  en: 'en' // angielski tytuł
}
const page = 0 // 0 - first, 1 - second ...

describe('SEARCH anime', () => {
  it('should respond with data', async () => {
    const data = await animesub.search(title, titletype.org, page)

    expect(data).not.toBeNull()
    expect(data).not.toBeUndefined()
    expect(data.pages).not.toBeNull()
    expect(data.page).not.toBeNull()
    expect(data.json).not.toBeNull()
    expect(data.json[0].title).not.toBeNull()
    expect(data.json[0].id).not.toBeNull()
    expect(data.json[0].sh).not.toBeNull()
  })
})
