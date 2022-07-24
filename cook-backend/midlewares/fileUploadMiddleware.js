
const path = require('path');
const multer = require('multer');
const uuid = require('uuid');

var storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname,'../public/uploads/'));
  },
  filename: (req, file, callback) => {
  
    var filename = (null, uuid.v4() + path.extname(file.originalname));
    callback(null, filename);
  },
});

var uploadFiles = multer({ storage: storage }).array('image', 10);

module.exports = uploadFiles;
