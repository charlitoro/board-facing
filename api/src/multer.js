const multer = require("multer");
const uuid = require("uuid");
const path = require('path')


const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/img/uploads'),
    filename: async (req, file, cb) => {
        cb(null, uuid() + path.extname(file.originalname));
    }
})

module.exports = multer({storage})