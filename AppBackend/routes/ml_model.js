const express = require('express')
const router = express.Router()

//load middlewares
const upload = require('../middlewares/multer')
const { authMiddleware } = require('../middlewares/auth')
const { sendUploadToGCS } = require('../middlewares/google-cloud-storage')

//load controllers
const ml_model_API = require('../controller/ml_model')
const { getModelData, uploadModel, getMyModels, getByName, uploadSav } = ml_model_API.crud

//defining routes
router.get('/all', getModelData)
router.get('/myModels', authMiddleware, getMyModels)
router.get('/versioning', authMiddleware, getByName)
router.post('/upload', authMiddleware, upload.single('modelData'), sendUploadToGCS, uploadModel)
router.post('/upload-sav', upload.single('savData'), sendUploadToGCS, uploadSav)

module.exports = router;