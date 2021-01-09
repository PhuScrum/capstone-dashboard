// uploading model to server
const multer = require('multer')

// config uploads
const upload = multer({
  storage: multer.MemoryStorage,
    limits: {
      fileSize: 10 * 1024 * 1024, // Maximum file size is 10MB
    }
})
  
  
module.exports = upload