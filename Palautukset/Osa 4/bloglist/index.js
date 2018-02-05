const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')

app.use(cors())
app.use(bodyParser.json())

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
app.use('/api/blogs', blogsRouter)

const mongoUrl = process.env.MONGODB_URI
mongoose.Promise = global.Promise
mongoose.connect(mongoUrl)


const PORT = 3003
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})