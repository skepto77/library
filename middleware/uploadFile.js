import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.includes('pdf')) {
    cb(null, true);
  } else {
    //cb(null, false);
    cb('Documents only!');
  }
};

let upload = multer({ storage: storage, fileFilter: fileFilter });

export default upload.single('BookFile');
