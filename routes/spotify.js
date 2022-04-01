const express = require('express')
const router = express.Router()
const { requestToken, search, playlist, getCurrentUser } = require('../controllers/spotify')


router.post('/token', requestToken)
router.post('/search', search)
router.post('/playlist', playlist)
router.post('/user', getCurrentUser)

module.exports  = router