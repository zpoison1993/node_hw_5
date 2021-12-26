const express = require('express')
const path = require('path')
const app = express()
const http = require('http')
const server = http.createServer(app)
require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(function (_, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept',
    )
    next()
})

app.use(express.static(path.join(process.cwd(), 'build')))
app.use(express.static(path.join(process.cwd(), 'upload')))

require('./models/connection')
require('./auth/passport')

app.use('/api', require('./routes'))

app.use('*', (_req, res) => {
    const file = path.resolve(process.cwd(), 'build', 'index.html')

    res.sendFile(file)
})

app.use((err, _, res, __) => {
    console.log(err.stack)
    res.status(500).json({
        code: 500,
        message: err.message,
    })
})

const PORT = process.env.PORT || 3000

server.listen(PORT, function () {
    console.log(`Server running. Use our API on port: ${PORT}`)
})
