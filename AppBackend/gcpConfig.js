const gcpBucket = 'capstone_rmit_2020';

const {Storage} = require('@google-cloud/storage');

// Instantiate a storage client
const storage = new Storage();
// A bucket is a container for objects (files).
const bucket = storage.bucket(gcpBucket);

module.exports = {
    bucket, bucketName: gcpBucket
};
