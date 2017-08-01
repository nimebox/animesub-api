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
    const filename = 'file'
    const titletype = {
      org: 'org'
    }
    
    const QUERY = {
      id: 12,
      sh: 13
    }
    
    animesub.download(title, titletype.org, QUERY.id, QUERY.sh, filename)
```

or see example: https://github.com/xdk78/animesub-api/tree/master/example
