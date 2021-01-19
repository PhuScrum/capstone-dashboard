const getModelData = require('./get-model-data')
const uploadModel = require('./upload-model')
const getMyModels = require('./get-by-userId')
const getByName = require('./get-by-name')

const crud = {
    getModelData,
    uploadModel,
    getMyModels,
    getByName
}

module.exports = crud