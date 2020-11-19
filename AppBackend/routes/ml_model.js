const express = require('express')
const router = express.Router()

const ml_model_API = require('../controller/ml_model')
const { getModelData, uploadModel } = ml_model_API.crud

router.get('/', getModelData)
router.post('/', uploadModel)

module.exports = router;