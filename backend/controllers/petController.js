import { analyzePetBreed } from '../services/geminiService.js';
import { config } from '../config/env.js';

export async function analyzePet(req, res, next) {
  try {
    if (!req.validatedImage) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'IMAGE_MISSING',
          message: 'No validated image found in request.',
        },
      });
    }

    const { base64, mimeType, originalSize, optimizedSize } = req.validatedImage;
    const petType = req.body.petType || 'any';

    const result = await analyzePetBreed(base64, mimeType, petType);

    // Attach optimization telemetry
    result.meta = {
      ...result.meta,
      imageMetrics: {
        originalSizeBytes: originalSize,
        optimizedSizeBytes: optimizedSize,
        savedBytes: Math.max(0, originalSize - optimizedSize),
        compressionRatio: ((1 - optimizedSize / originalSize) * 100).toFixed(1) + '%',
      },
    };

    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

export function getHealth(req, res) {
  return res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    service: 'PetVision AI Backend',
  });
}

export function getReadiness(req, res) {
  const geminiConfigured = Boolean(config.geminiApiKey && config.geminiApiKey.length > 5);
  return res.status(geminiConfigured ? 200 : 503).json({
    status: geminiConfigured ? 'ready' : 'degraded',
    geminiConfigured,
    model: config.geminiModel,
    env: config.nodeEnv,
    maxUploadSizeBytes: config.maxFileSize,
    rateLimits: {
      general: `${config.generalRateLimit} req / ${config.rateLimitWindowMs / 60000}m`,
      aiAnalysis: `${config.aiRateLimit} req / ${config.rateLimitWindowMs / 60000}m`,
    },
  });
}

export function getApiInfo(req, res) {
  return res.status(200).json({
    name: 'PetVision AI API',
    tagline: "Discover Your Pet's Breed with AI",
    version: '1.0.0',
    documentation: {
      endpoints: [
        {
          path: '/api/v1/pet/analyze',
          method: 'POST',
          description: 'Upload an image of a dog or cat for AI breed analysis',
          contentType: 'multipart/form-data',
          field: 'image',
          supportedFormats: ['JPG', 'JPEG', 'PNG', 'WEBP'],
          maxSize: '5 MB',
        },
        {
          path: '/api/v1/health',
          method: 'GET',
          description: 'Liveness health check endpoint',
        },
        {
          path: '/api/v1/health/ready',
          method: 'GET',
          description: 'Application readiness check',
        },
      ],
    },
    privacy: 'Images are processed entirely in-memory and never stored on persistent storage.',
  });
}
