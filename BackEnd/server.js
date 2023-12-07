const express = require("express")
const path = require("path")
require("dotenv").config()
const cache = require('express-redis-cache')
const { xss } = require('express-xss-sanitizer');
const cors = require('cors')
const https = require('https');
const fs = require('fs');

const app = express()
app.use(express.json(), xss(), cors())
//app.use(cache.route());
const redisCache = cache({
    host: 'localhost',
    port: 6379
  });

const WebSocket = require('ws');
const WebsocketServer = require('./websocket/websocketServer')
app.use('/login', require("./routes/loginAPI"))
app.use('/news', require("./routes/newsAPI"))

app.use('/install', require("./routes/installAPI"))

https.createServer({
  key: fs.readFileSync('private.pem'),
  cert: fs.readFileSync('server.pem'),
}, app).listen(3000, () => {
  console.log('Working... http://localhost:3000')
});
/*
app.listen(3000, () => {
    console.log('Working... http://localhost:3000')
})
*/