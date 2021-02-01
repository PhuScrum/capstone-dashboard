const moment = require('moment')
const gcsHelpers = require('../helpers/gcpConfig');

const { storage } = gcsHelpers;

const DEFAULT_BUCKET_NAME = 'capstone_rmit_2020'; // Replace with the name of your bucket

exports.bucket = storage.bucket(DEFAULT_BUCKET_NAME);

//config cors for bucket
const configureBucketCors = async () => {
    const maxAgeSeconds = 3600;
    const bucketName = DEFAULT_BUCKET_NAME

    const method = 'GET';
    const origin = "http://localhost:4200/";
    const responseHeader = 'Access-Control-Allow-Origin, Content-Type, Accept, Accept-Language, Origin, User-Agent'

    await storage.bucket(bucketName).setCorsConfiguration([
      {
        maxAgeSeconds,
        method,
        origin,
        responseHeader,
      },
    ]);
  
    console.log(`Bucket ${bucketName} was updated with a CORS config
        to allow ${method} requests from ${origin} sharing 
        ${responseHeader} responses across origins`);
}

exports.configureBucketCors = configureBucketCors;

/**
 * Middleware for uploading file to GCS.
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @return {*}
 */
exports.sendUploadToGCS = (req, res, next) => {
    if (!req.file) {
        return next();
    }

    //bucket detail
    const bucketName = DEFAULT_BUCKET_NAME;
    const bucket = storage.bucket(bucketName);

    //get upload date
    const date = moment().format('MMMM Do YYYY, h:mm:ss a');

    //file name
    const version = Date.now() //generate the version from timestamp
    const fileName = `${version}-${req.file.originalname}` //combine the version name and original name -> filename
    const gcsFileName = req.body.directory ? `${req.body.directory}/${fileName}` : fileName; //specify the sub-directory

    //send file stream to GCS
    const file = bucket.file(gcsFileName);
    const stream = file.createWriteStream({
        metadata: {
        contentType: req.file.mimetype,
        },
    });

    stream.on('error', (err) => {
        req.file.cloudStorageError = err;
        next(err);
    });

    stream.on('finish', () => {
        return file.makePublic()
        .then(() => {
            req.file.date = date
            req.file.version = version;
            req.file.fileName = fileName;
            req.file.gcsUrl = gcsHelpers.getPublicUrl(bucketName, gcsFileName); //get the file url
            next();
        });
    });

    stream.end(req.file.buffer);
};