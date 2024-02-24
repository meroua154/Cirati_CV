const multer = require('multer');

const generateImageURL = (req, filename) => {
  const imageURL = `http://${req.get("host")}/ciraticv/Images/${filename}`;
  return imageURL;
};
const normalizeFilename = (originalFilename) => {
  return originalFilename.replace(/[^\w\d]/g, '').replace(/\s+/g, '').replace(/\(/g, '').replace(/\)/g, '');
};
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'Image') {
      cb(null, './Images');
    } 
  },
  filename: function (req, file, cb) {
    const originalFilenameWithoutExtension = file.originalname.split('.').slice(0, -1).join('.');
    const normalizedFilename = normalizeFilename(originalFilenameWithoutExtension);
    const extension = file.originalname.split('.').pop();
    const timestamp = Date.now();
    cb(null, `${timestamp}_${normalizedFilename}.${extension}`);
  },
});
const upload = multer({ storage: storage });
module.exports = {
  generateImageURL,
  upload,
};