const express = require('express')
const router = express.Router()

const upload = require('../controller/dataset/multer')
const { crud } = require('../controller/dataset')
const { get, getById, post, edit, remove, getByName, getByUserId } = crud

const { authMiddleware } = require('../middlewares/auth')
const { sendUploadToGCS } = require('../middlewares/google-cloud-storage')

router.get('/all', get)
router.get('/myDatasets', authMiddleware, getByUserId)
router.get('/versioning', authMiddleware, getByName)
router.post('/upload', authMiddleware, upload.single('datasetData'), sendUploadToGCS, post)
router.get('/detail/:id', getById)
router.put('/update/:id', edit)
router.delete('/delete/:id', remove)

//other queries
// router.get('/detail/*', getByName)

module.exports = router