const path = require('path')
const { Storage } = require('@google-cloud/storage');

const auth = {
    keyFilename: path.join(__dirname, './faunadb-1204-4fc80f10037e.json'),
    projectId: 'faunadb-1204'
}

const storage =  new Storage(auth);

// Instantiate a storage client
exports.storage = storage;

/**
   * Get public URL of a file. The file must have public access
   * @param {string} bucketName
   * @param {string} fileName
   * @return {string}
*/
exports.getPublicUrl = (bucketName, fileName) => `https://storage.googleapis.com/${bucketName}/${fileName}`;