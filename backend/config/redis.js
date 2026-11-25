import { createClient } from 'redis';
import { config } from './env.js';

let redisClient = null;

if (config.redisUrl) {
  try {
    redisClient = createClient({
      url: config.redisUrl,
      socket: {
        reconnectStrategy: (retries) => {
          if (retries > 5) {
            console.warn('[Redis] Max reconnection attempts reached. Continuing with in-memory fallback.');
            return new Error('Redis max retries reached');
          }
          return Math.min(retries * 200, 3000);
        },
      },
    });

    redisClient.on('error', (err) => {
      console.warn(`[Redis Warning] ${err.message}`);
    });

    redisClient.on('connect', () => {
      console.log('[Redis] Connected successfully for distributed rate-limiting.');
    });

    await redisClient.connect().catch((err) => {
      console.warn(`[Redis Connection Error] ${err.message}. Running without distributed Redis cache.`);
      redisClient = null;
    });
  } catch (err) {
    console.warn(`[Redis Init Error] ${err.message}`);
    redisClient = null;
  }
}

export { redisClient };
