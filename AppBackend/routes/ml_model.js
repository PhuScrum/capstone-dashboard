const express = require('express')
const router = express.Router()

const upload = require('../middlewares/multer')
const ml_model_API = require('../controller/ml_model')
const { getModelData, uploadModel, getMyModels } = ml_model_API.crud

const { authMiddleware } = require('../middlewares/auth')
const { sendUploadToGCS } = require('../middlewares/google-cloud-storage')

router.get('/all', getModelData)
router.get('/myModels', authMiddleware, getModelData)
router.post('/upload', authMiddleware, upload.single('modelData'), sendUploadToGCS, uploadModel)

module.exports = router;