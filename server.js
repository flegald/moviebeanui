const express = require('express')

const serveStatic = require('serve-static')
const app = express()
// eslint-disable-next-line no-path-concat
app.use(serveStatic(__dirname + '/dist'))
const port = process.env.PORT || 5000
app.listen(port)
console.log('server started ' + port)
