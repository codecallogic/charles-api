const express = require('express')
const router = express.Router()
const { generateCSV } = require('../controllers/csv')

router.post('/generate', generateCSV )

module.exports  = router