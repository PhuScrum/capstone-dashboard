// uploading model to server
const multer = require('multer')
const path = require('path');

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    var path = 'files/dataset'
    cb(null, path);
    // cb(null, './Express/uploads/');
  },
  filename: function(req, file, cb){
    const dateTime = Date.now()
    const ext = path.parse(file.originalname).ext
    const name = path.parse(file.originalname).name
    const filename = name + '-' + dateTime + ext
    // for windows add .replace(/:/g, '-') add the end of the toISOString https://stackoverflow.com/questions/48418680/enoent-no-such-file-or-directory/48653921#48653921
    cb(null, filename) 
  }

})

// config uploads
const upload = multer({storage, limits: {
  fileSize: 1024 * 1024 * 7
}})
  
  
module.exports = upload