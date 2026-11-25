import multer from 'multer';
import { isDev } from '../config/env.js';

export function errorHandler(err, req, res, next) {
  // Multer error handling
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({
        success: false,
        error: {
          code: 'FILE_TOO_LARGE',
          message: 'The uploaded image exceeds the 5 MB maximum size limit. Please upload a smaller image.',
        },
      });
    }

    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({
        success: false,
        error: {
          code: 'UNEXPECTED_FIELD',
          message: 'Unexpected file field. Please send the image file in the "image" field.',
        },
      });
    }

    return res.status(400).json({
      success: false,
      error: {
        code: `UPLOAD_ERROR_${err.code}`,
        message: err.message,
      },
    });
  }

  // Known application error with statusCode
  const statusCode = err.statusCode || (err.status >= 400 && err.status < 600 ? err.status : 500);
  const errorCode = err.code || (statusCode === 500 ? 'INTERNAL_SERVER_ERROR' : 'BAD_REQUEST');
  const message = err.message || 'An unexpected error occurred while processing your request.';

  console.error(`[Error ${statusCode}] [${errorCode}]:`, err.message);
  if (isDev && statusCode === 500) {
    console.error(err.stack);
  }

  return res.status(statusCode).json({
    success: false,
    error: {
      code: errorCode,
      message,
      ...(isDev && statusCode === 500 ? { stack: err.stack } : {}),
    },
  });
}
