const animesub = require('../src/index')
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
  })
})
