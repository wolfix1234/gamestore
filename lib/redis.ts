// lib/redis.ts
import { createClient } from 'redis';

const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

let isConnected = false;

export const connectRedis = async () => {
  if (!isConnected) {
    await redisClient.connect();
    isConnected = true;
  }
};

export default redisClient;
