const path = require('path')
const { Storage } = require('@google-cloud/storage');

const auth = {
    keyFilename: path.join(__dirname, './faunadb-1204-4fc80f10037e.json'),
    projectId: 'faunadb-1204'
}

// Instantiate a storage client
exports.storage = new Storage(auth);

/**
   * Get public URL of a file. The file must have public access
   * @param {string} bucketName
   * @param {string} fileName
   * @return {string}
*/
exports.getPublicUrl = (bucketName, fileName) => `https://storage.googleapis.com/${bucketName}/${fileName}`;

/**
   * Copy file from local to a GCS bucket.
   * Uploaded file will be made publicly accessible.
   *
   * @param {string} localFilePath
   * @param {string} bucketName
   * @param {Object} [options]
   * @return {Promise.<string>} - The public URL of the uploaded file.
   */
exports.copyFileToGCS = (localFilePath, bucketName, options) => {
    options = options || {};

    const bucket = storage.bucket(bucketName);
    const fileName = path.basename(localFilePath);
    const file = bucket.file(fileName);

    return bucket.upload(localFilePath, options)
        .then(() => file.makePublic())
        .then(() => exports.getPublicUrl(bucketName, gcsName));
};