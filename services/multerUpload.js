import multer from "multer";
import path from "path";

// set storage engine
const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

// init upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 10485760 },
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
}).single("myImage");

function checkFileType(file, cb) {
    // allowed extensions
    const filetypes = /jpeg|jpg|png|gif/;

    // check originalName
    const fileType = filetypes.test(path.extname(file.originalname).toLowerCase());

    // check mimetype
    const mimetype = filetypes.test(file.mimetype);

    if (fileType && mimetype) {
        return cb(null, true);
    }

    return cb('Error: Images Only!!');
}

export default upload;