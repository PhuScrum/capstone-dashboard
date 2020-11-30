const express = require('express')
const router = express.Router()

const { crud } = require('../controller/dataset')
const { get, getById, post, edit, remove } = crud
const { authMiddleware } = require('../middlewares/auth')

router.get('/', get)
router.post('/', post)
router.get('/:id', getById)
router.put('/:id', edit)
router.delete('/:id', remove)

module.exports = router