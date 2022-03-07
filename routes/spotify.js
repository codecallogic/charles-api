const express = require('express')
const router = express.Router()
const { requestToken, search } = require('../controllers/spotify')


router.post('/token', requestToken)
router.post('/search', search)

module.exports  = router