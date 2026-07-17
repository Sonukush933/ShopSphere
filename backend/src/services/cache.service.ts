import { redisClient } from "../config/redis";

/**
 * Save data in Redis
 */
export const setCache = async (
  key: string,
  value: unknown,
  ttl: number = 300
): Promise<void> => {
  await redisClient.set(
    key,
    JSON.stringify(value),
    {
      EX: ttl,
    }
  );
};

/**
 * Get data from Redis
 */
export const getCache = async <T>(
  key: string
): Promise<T | null> => {

  const data = await redisClient.get(key);

  if (!data) return null;

  return JSON.parse(data) as T;
};

/**
 * Delete cache
 */
export const deleteCache = async (
  key: string
): Promise<void> => {
  await redisClient.del(key);
};

/**
 * Delete cache using pattern
 */
export const deleteCacheByPattern = async (
  pattern: string
): Promise<void> => {

  const keys = await redisClient.keys(pattern);

  if (keys.length > 0) {
    await redisClient.del(keys);
  }
};