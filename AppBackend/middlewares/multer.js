// uploading model to server
const multer = require('multer')

// config uploads
const upload = multer({
  storage: multer.MemoryStorage, //The memory storage engine stores the files in memory as Buffer objects
                                //the buffer can be accessed from req.file.buffer
    limits: {
      fileSize: 10 * 1024 * 1024, // Maximum file size is 10MB
    }
})

module.exports = upload