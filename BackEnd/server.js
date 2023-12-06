const express = require("express")
const path = require("path")
require("dotenv").config()
const cache = require('express-redis-cache')
const { xss } = require('express-xss-sanitizer');

const app = express()
app.use(express.json(), xss())
//app.use(cache.route());
const redisCache = cache({
    host: 'localhost',
    port: 6379
  });

app.use('/login', require("./routes/loginAPI"))
app.use('/news', require("./routes/newsAPI"))

app.use('/install', require("./routes/installAPI"))

app.listen(3000, () => {
    console.log('Working... http://localhost:3000')
})