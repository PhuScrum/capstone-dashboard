const getModelData = require('./get-model-data')
const uploadModel = require('./upload-model')
const getMyModels = require('./get-by-userId')
const getByName = require('./get-by-name')
const uploadSav = require('./upload-sav')

const crud = {
    getModelData,
    uploadModel,
    getMyModels,
    getByName,
    uploadSav
}

module.exports = crud