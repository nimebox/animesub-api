# Animesub-api
Unofficial api for
http://animesub.info

## Install animesub-api
    npm install animesub-api --save
    
## Usage
### Download subtitles

```javascript
const animesub = require('animesub-api')
const title = 'boruto'
const filename = 'boruto_napisy' // output boruto_napisy.zip
const titletype = {
  org: 'org', // oryginalny tytuł
  pl: 'pl', // polski tytuł
  en: 'en' // angielski tytuł
}

let id = 1

animesub.download(title, titletype.org, id, filename)

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

animesub.search(title, titletype.org).then((out) => {
  console.log(out)
}).catch((err) => {
  console.log(err)
})

```

```json
[
	{
		"title": "Shokugeki no Souma: Ni no Sara ep01",
		"id": "61220",
		"sh": "cbb68e1d743aa90784e24254a087aa61b0f3f5fd"
	},
	{
		"title": "Shokugeki no Souma: Ni no Sara ep02",
		"id": "61286",
		"sh": "48ad028c6d256a5b681d79edc106ad156747d287"
	}
]	
```


