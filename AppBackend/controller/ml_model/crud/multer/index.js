// uploading model to server
const multer = require('multer')
const storage= multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './../../../../data/');
    // cb(null, './Express/uploads/');
  },
  filename: function(req, file, cb){
    // for windows add .replace(/:/g, '-') add the end of the toISOString https://stackoverflow.com/questions/48418680/enoent-no-such-file-or-directory/48653921#48653921
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname) 
  }
  
})

// config uploads
const upload = multer({storage, limits: {
    fileSize: 1024 * 1024 * 7
  }})
  
  
  module.exports = upload