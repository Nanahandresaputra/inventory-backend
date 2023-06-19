const { error } = require("console");
const multer = require("multer");
const os = require("os");

const extensionImage = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

const upload = multer({
  dest: os.tmpdir(),
  fileFilter: (req, file, cb) => {
    if (!extensionImage.includes(file.mimetype)) {
      return cb(new error("berkas tidak diperbolehkan"));
    }
    cb(null, true);
  },
}).single("image");

module.exports = upload;
