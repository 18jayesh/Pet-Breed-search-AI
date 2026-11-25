import sharp from 'sharp';

const ALLOWED_SHARP_FORMATS = ['jpeg', 'png', 'webp'];
const MIN_DIMENSION = 50;
const MAX_DIMENSION = 1600;

export async function validateAndOptimizeImage(req, res, next) {
  try {
    if (!req.file || !req.file.buffer || req.file.buffer.length === 0) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'NO_IMAGE_PROVIDED',
          message: 'No image was uploaded. Please upload a valid dog or cat photo.',
        },
      });
    }

    const originalBuffer = req.file.buffer;
    const originalSize = originalBuffer.length;

    // Inspect real image metadata using Sharp (do not rely solely on client MIME header)
    let metadata;
    try {
      metadata = await sharp(originalBuffer).metadata();
    } catch (sharpErr) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'CORRUPTED_IMAGE',
          message: 'The uploaded file is not a valid or readable image. Please try another image.',
        },
      });
    }

    // Verify format
    if (!metadata.format || !ALLOWED_SHARP_FORMATS.includes(metadata.format.toLowerCase())) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'UNSUPPORTED_FORMAT',
          message: `Unsupported image format (${metadata.format || 'unknown'}). Please upload a JPG, PNG, or WEBP image.`,
        },
      });
    }

    // Verify dimensions
    if (!metadata.width || !metadata.height || metadata.width < MIN_DIMENSION || metadata.height < MIN_DIMENSION) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'IMAGE_TOO_SMALL',
          message: `The image dimensions are too small (${metadata.width || 0}x${metadata.height || 0}px). Minimum size is ${MIN_DIMENSION}x${MIN_DIMENSION}px.`,
        },
      });
    }

    // Optimize image: resize if larger than 1600px, strip EXIF metadata for privacy, convert to JPEG 85% quality
    const optimizedBuffer = await sharp(originalBuffer)
      .rotate() // auto-orient based on EXIF before stripping
      .resize({
        width: MAX_DIMENSION,
        height: MAX_DIMENSION,
        fit: 'inside',
        withoutEnlargement: true,
      })
      .jpeg({ quality: 85, mozjpeg: true })
      .toBuffer();

    req.validatedImage = {
      buffer: optimizedBuffer,
      base64: optimizedBuffer.toString('base64'),
      mimeType: 'image/jpeg',
      originalSize,
      optimizedSize: optimizedBuffer.length,
      format: metadata.format,
      width: metadata.width,
      height: metadata.height,
    };

    next();
  } catch (err) {
    console.error('[Image Processing Error]:', err.message);
    return res.status(500).json({
      success: false,
      error: {
        code: 'IMAGE_PROCESSING_FAILED',
        message: 'Failed to process the uploaded image. Please try again.',
      },
    });
  }
}
