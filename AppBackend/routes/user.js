const express = require('express')
const router = express.Router()

const { profile } = require('../controller/user')
const { authMiddleware } = require('../middlewares/auth')

router.get('/profile/:id', authMiddleware, profile )

module.exports = router;