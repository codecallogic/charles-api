const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config()

const app = express()

app.use(morgan('dev'))
app.use('/files/storage', express.static(__dirname + '/public'))
app.use(cors({credentials: true, origin: process.env.CLIENT_URL}))
app.use(express.json())

const spotifyRoutes = require('./routes/spotify')
const csvRoutes = require('./routes/csv')
const testRoutes = require('./routes/test')

app.use('/api/spotify', spotifyRoutes)
app.use('/api/csv', csvRoutes)
app.use('/api/test', testRoutes)

const port = process.env.PORT || 3001

app.listen(port, () => console.log(`Server is running on port ${port}`))