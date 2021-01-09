const path = require('path');
const {Storage} = require('@google-cloud/storage');
const {BigQuery} = require('@google-cloud/bigquery');

const cloudStorageMiddleware = (req, res, next) => {
    const gcpBucket = 'capstone_rmit_2020';
    const auth = {
        keyFilename: path.join(__dirname, './faunadb-1204-4fc80f10037e.json'),
        projectId: 'faunadb-1204'
    }

    // Instantiate a storage client
    const storage = new Storage(auth);

    const bigquery = new BigQuery(auth);
    
    // A bucket is a container for objects (files).
    const bucket = storage.bucket(gcpBucket);

    req.bucket = bucket;
    req.bigquery = bigquery;
    next()
}

module.exports = cloudStorageMiddleware
