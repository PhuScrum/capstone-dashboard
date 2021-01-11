const getModelData = require('./get-model-data')
const uploadModel = require('./upload-model')
const getMyModels = require('./get-by-userId')

const crud = {
    getModelData,
    uploadModel,
    getMyModels
}

module.exports = crud