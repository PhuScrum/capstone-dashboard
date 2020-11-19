const express = require('express')
const router = express.Router()

const { logout, login } = require('../controller/auth')
const { authMiddleware } = require('../middlewares/auth')

router.post('/login', login)
router.post('/logout', authMiddleware, logout)

module.exports = router