import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import { config } from './config/env.js';
import { generalLimiter } from './middlewares/rateLimiter.js';
import { errorHandler } from './middlewares/errorHandler.js';
import petRoutes from './routes/petRoutes.js';
import healthRoutes from './routes/healthRoutes.js';

const app = express();

// Proxy configuration: only trust proxy when explicitly enabled for Nginx or reverse proxy
if (config.trustProxy) {
  app.set('trust proxy', config.trustProxy);
}

// Security headers with Helmet
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    contentSecurityPolicy: false, // API server does not serve HTML documents
  })
);

// Compression for network efficiency
app.use(compression());

// Controlled CORS
const allowedOrigins = [
  config.frontendUrl,
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:3000',
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or same-origin reverse proxy)
      if (!origin || allowedOrigins.includes(origin) || config.nodeEnv === 'development') {
        return callback(null, true);
      }
      return callback(new Error(`CORS policy does not allow access from origin: ${origin}`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  })
);

// Body parsers (JSON & URL-encoded)
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Apply general rate limiter across all incoming requests
app.use(generalLimiter);

// Health & Root API Routes
app.use('/api/v1', healthRoutes);

// Pet Recognition AI Routes
app.use('/api/v1/pet', petRoutes);

// 404 Catch-all handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'ROUTE_NOT_FOUND',
      message: `The requested endpoint ${req.method} ${req.originalUrl} does not exist.`,
    },
  });
});

// Centralized error handler
app.use(errorHandler);

// Start server
const server = app.listen(config.port, () => {
  console.log(`===============================================`);
  console.log(`🐾 PetVision AI Backend running on port ${config.port}`);
  console.log(`📍 Environment: ${config.nodeEnv}`);
  console.log(`🤖 Gemini Model: ${config.geminiModel}`);
  console.log(`🔑 Gemini Key Configured: ${Boolean(config.geminiApiKey)}`);
  console.log(`🛡️ Rate Limits: ${config.generalRateLimit} req / 15m (General), ${config.aiRateLimit} req / 15m (AI)`);
  console.log(`===============================================`);
});

// Graceful shutdown handling
const handleShutdown = (signal) => {
  console.log(`\n[${signal}] Received. Shutting down gracefully...`);
  server.close(() => {
    console.log('[Server] HTTP connections closed.');
    process.exit(0);
  });

  // Force close after 10 seconds if hanging
  setTimeout(() => {
    console.error('[Server] Forceful shutdown initiated after timeout.');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => handleShutdown('SIGTERM'));
process.on('SIGINT', () => handleShutdown('SIGINT'));

export default app;
