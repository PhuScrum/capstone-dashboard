const gcsHelpers = require('../helpers/gcpConfig');
  
  const { storage } = gcsHelpers;

  const DEFAULT_BUCKET_NAME = 'capstone_rmit_2020'; // Replace with the name of your bucket
  
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
    const bucketName = req.body.bucketName || DEFAULT_BUCKET_NAME;
    const bucket = storage.bucket(bucketName);

    //file name
    const version = Date.now()
    const fileName = `${version}-${req.file.originalname}`
    const gcsFileName = req.body.directory ? `${req.body.directory}/${fileName}` : fileName;

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
          req.file.version = version;
          req.file.fileName = fileName;
          req.file.gcsUrl = gcsHelpers.getPublicUrl(bucketName, gcsFileName);
          next();
        });
    });
  
    stream.end(req.file.buffer);
  };