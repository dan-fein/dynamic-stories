const Instagram = require('instagram-web-api')
require('dotenv').config()
var chokidar = require('chokidar');
var watcher = chokidar.watch('screenshots', {
  ignored: /(^|[\/\\])\../,
  persistent: true,
  ignoreInitial: true
});
const { username, password } = process.env
const client = new Instagram({ username, password })
var log = console.log.bind(console)

watcher.on('add', path => {
      console.log(path)
      client.login()
        .then(() => {
          console.log('upload story', path)
          client.uploadStory({ photo: path })
          .then(console.log)
        })
      }
  )
