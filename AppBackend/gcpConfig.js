const path = require('path');


const cloudStorageMiddleware = (req, res, next) => {
    const gcpBucket = 'capstone_rmit_2020';

    const {Storage} = require('@google-cloud/storage');

    // Instantiate a storage client
    const storage = new Storage({
        keyFilename: path.join(__dirname, './faunadb-1204-4fc80f10037e.json'),
        projectId: 'faunadb-1204'
    });
    
    // A bucket is a container for objects (files).
    const bucket = storage.bucket(gcpBucket);

    req.bucket = bucket;
    next()
}

module.exports = cloudStorageMiddleware
