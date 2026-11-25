import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Load backend/.env reliably regardless of current working directory
dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config(); // fallback to current working directory .env if present

export const config = {
  port: parseInt(process.env.PORT || '5000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  geminiApiKey: process.env.GEMINI_API_KEY || '',
  geminiModel: process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '5242880', 10), // 5MB
  generalRateLimit: parseInt(process.env.GENERAL_RATE_LIMIT || '100', 10),
  aiRateLimit: parseInt(process.env.AI_RATE_LIMIT || '5', 10),
  rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10), // 15 mins
  redisUrl: process.env.REDIS_URL || '',
  trustProxy: process.env.TRUST_PROXY === 'true' ? 1 : (process.env.TRUST_PROXY && process.env.TRUST_PROXY !== 'false' ? process.env.TRUST_PROXY : false),
};

export const isDev = config.nodeEnv === 'development';
