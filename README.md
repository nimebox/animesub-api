# animesub-api [![Build Status](https://travis-ci.org/nimebox/animesub-api.svg?branch=master)](https://travis-ci.org/nimebox/animesub-api)

Unofficial api for
<http://animesub.info>

## Install animesub-api

    npm i animesub-api

## Usage

### Download subtitles

```javascript
const fs = require('fs')
const animesub = require('animesub-api')
const title = 'boruto'
const path = 'boruto_napisy.zip' // output boruto_napisy.zip
const titletype = {
  org: 'org', // oryginalny tytuł
  pl: 'pl', // polski tytuł
  en: 'en' // angielski tytuł
}
const id = 1
// Search and download
animesub.search(title, titletype.org, page)
  .then(data => {
    console.log(data)
    animesub.download(data.json[0].id, data.json[0].sh)
      .then(file => fs.writeFileSync(path, file))
      .catch(err => console.error(err))
  }).catch(err => console.error(err))


```

### Search

```javascript
const animesub = require('animesub-api')
const title = 'shokugeki no souma'
const titletype = {
  org: 'org', // oryginalny tytuł
  pl: 'pl', // polski tytuł
  en: 'en' // angielski tytuł
}

animesub.search(title, titletype.org).then((data) => {
  console.log(data)
}).catch((err) => {
  console.log(err)
})

```

```js
{
  pages: 2,
  page: 0,
  json: [
    {
      title: 'Shokugeki no Souma: Ni no Sara ep01',
      added: '2016.07.07',
      format: 'Advanced SSA',
      user: '_Crimson_Red_',
      description:
        `<b>ID 61211<br>Autor:</b> _Crimson_Red_<br>T�umaczenie: _Crimson_Red_\n<br>T�umaczenie na podstawie [HorribleSubs]\n<br>==================================\n<br>Wszelkie b��dy prosz� zg�asza� w komentarzach.\n<br>Enjoy.`,
      id: '61211',
      sh: 'd4641f6d5e6696d31c108c22d2b6108aa7586c5f' },
    { title: 'Shokugeki no Souma: Ni no Sara ep02',
      added: '2016.07.22',
      format: 'Advanced SSA',
      user: 'nyah2211',
      description:
        `<b>ID 61286<br>Autor:</b> nyah2211 &amp; Xam10<br>******************************************\n<br>-----------&gt;Napisy przygotowa�a grupa&lt;-------------\n<br>------------------&gt;Katakana Subs&lt;--------------------\n<br>****************************************** \n<br>T�umaczenie: nyah2211 \n<br>Korekta: DaMS\n<br>Typesetting: Vincent_Law\n<br>Synhro do [Ohys-Raws]: Dx51\n<br>\n<br>Synchro: \n<br>[HorribleSubs] Shokugeki no Soma S2 - 02 [720p]\n<br>[Ohys-Raws] Shokugeki no Souma Ni no Sara - 02 (MX 1280x720 x264 AAC)\n<br>Czcionki: \n<br>https://drive.google.com/file/d/0B-tnuCJniqDvaWRHN09aUmVqSDQ\n<br>\n<br>Zapraszamy na nasz� stron� \n<br>http://katakanasubs.net \n<br>\n<br>Mi�ego seansu.\n<br>\n<br>10.10.2016r - Dodane synchro do Ohys-Raws`,
      id: '61286',
      sh: '86d19aeb4916a9328ed2c5e09f56daeffa9389d0' },
  ]
}
```
