const express = require('express')
const router = express.Router()

const { logout, login } = require('../controller/auth')

router.post('/login', login)
router.post('/logout', logout)

module.exports = router