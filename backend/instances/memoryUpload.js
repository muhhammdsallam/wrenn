import multer from 'multer';
import AppError from '../utils/AppError.js';

const storage = multer.memoryStorage();

const memoryImageUpload = multer({
  storage: storage,
  limits: {
    fileSize: 10000000, // 10MB max image size
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new AppError('please upload a valid image file', 400));
    }
    cb(undefined, true);
  },
});

export default memoryImageUpload;
