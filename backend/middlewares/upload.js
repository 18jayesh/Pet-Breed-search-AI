import multer from 'multer';
import { config } from '../config/env.js';

// Use memoryStorage to avoid saving sensitive or unnecessary image files on disk
const storage = multer.memoryStorage();

const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

const fileFilter = (req, file, cb) => {
  if (allowedMimeTypes.includes(file.mimetype.toLowerCase())) {
    cb(null, true);
  } else {
    const error = new Error('Unsupported image format. Allowed formats: JPG, JPEG, PNG, WEBP.');
    error.statusCode = 400;
    error.code = 'INVALID_FILE_TYPE';
    cb(error, false);
  }
};

export const upload = multer({
  storage,
  limits: {
    fileSize: config.maxFileSize, // 5MB
    files: 1,
  },
  fileFilter,
});
