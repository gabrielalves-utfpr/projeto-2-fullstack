const express = require("express")
const path = require("path")
require("dotenv").config()

const app = express()
app.use(express.json())


app.use('/install', require("./routes/installAPI"))

app.listen(3000, () => {
    console.log('Working... http://localhost:3000')
})