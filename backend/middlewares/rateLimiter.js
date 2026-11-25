import rateLimit from 'express-rate-limit';
import { RedisStore } from 'rate-limit-redis';
import { config } from '../config/env.js';
import { redisClient } from '../config/redis.js';

const getStore = (prefix) => {
  if (redisClient && redisClient.isReady) {
    return new RedisStore({
      sendCommand: (...args) => redisClient.sendCommand(args),
      prefix: `petvision:rl:${prefix}:`,
    });
  }
  return undefined; // In-memory fallback
};

export const generalLimiter = rateLimit({
  windowMs: config.rateLimitWindowMs,
  max: config.generalRateLimit,
  standardHeaders: true,
  legacyHeaders: false,
  store: getStore('general'),
  message: {
    success: false,
    error: {
      code: 'TOO_MANY_REQUESTS',
      message: 'Too many requests from this IP address. Please try again later.',
    },
  },
});

export const aiLimiter = rateLimit({
  windowMs: config.rateLimitWindowMs,
  max: config.aiRateLimit,
  standardHeaders: true,
  legacyHeaders: false,
  store: getStore('ai'),
  message: {
    success: false,
    error: {
      code: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many image analysis requests. Please try again later.',
    },
  },
  statusCode: 429,
});
