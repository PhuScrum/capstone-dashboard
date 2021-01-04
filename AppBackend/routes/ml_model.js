const express = require('express')
const router = express.Router()

const upload = require('../controller/ml_model/multer')
const ml_model_API = require('../controller/ml_model')
const { getModelData, uploadModel } = ml_model_API.crud

router.get('/', getModelData)
router.post('/', upload.single('modelData'), uploadModel)

module.exports = router;