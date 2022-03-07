const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config()

const app = express()

app.use(morgan('dev'))
app.use(cors({credentials: true, origin: process.env.CLIENT_URL}))
app.use(express.json())

const spotifyRoutes = require('./routes/spotify')

app.use('/api/spotify', spotifyRoutes)

const port = process.env.PORT || 3001

app.listen(port, () => console.log(`Server is running on port ${port}`))