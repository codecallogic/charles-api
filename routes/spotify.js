const express = require('express')
const router = express.Router()
const { requestToken, search, playlist } = require('../controllers/spotify')


router.post('/token', requestToken)
router.post('/search', search)
router.post('/playlist', playlist)

module.exports  = router