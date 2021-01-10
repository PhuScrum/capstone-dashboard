const express = require('express')
const router = express.Router()

const upload = require('../controller/dataset/multer')
const { crud } = require('../controller/dataset')
const { get, getById, post, edit, remove, getByName } = crud

const { authMiddleware } = require('../middlewares/auth')
const { sendUploadToGCS } = require('../middlewares/google-cloud-storage')

router.get('/', get)
router.post('/', authMiddleware, upload.single('datasetData'), sendUploadToGCS, post)
router.get('/detail/:id', getById)
router.put('/update/:id', edit)
router.delete('/delete/:id', remove)

//other queries
// router.get('/detail/*', getByName)

module.exports = router