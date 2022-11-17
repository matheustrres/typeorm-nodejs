import config from 'config';
import IORedis, { Redis as RedisClient, RedisKey } from 'ioredis';

import { RedisConfigProps } from '@/config/default';

const redisConfig: RedisConfigProps = config.get<
  RedisConfigProps
>('app.resources.redis');

/**
 * Represents the main CacheManager 
 */
export class CacheManager {
  private ONE_DAY_IN_MS: number = 86_400_000;

  /**
   * Creates a new CacheManager instance
   * 
   * @param {RedisClient} [client] - The IORedis client  
   */
  constructor(private client: RedisClient = new IORedis(redisConfig)) {}

  /**
   * Deletes a key
   * 
   * @param {RedisKey} redisKey - The key to be deleted
   * @returns {Promise<void>} 
   */
  public async delete(redisKey: RedisKey): Promise<void> {
    await this.client.del(redisKey);
  }

  /**
   * Gets the parsed value of a key
   * 
   * @param {RedisKey} redisKey - The key to be found
   * @returns {Promise<T|null>}
   */
  public async get<T>(redisKey: RedisKey): Promise<T|null> {
    const data: string = await this.client.get(redisKey);

    return data ? JSON.parse(data) as T : null;
  }

  /**
   * Sets the value of a key
   * 
   * @param {RedisKey} redisKey - The key be filled
   * @param {T} value - The value for the key
   * @returns {Promise<string>}
   */
  public async set<T>(redisKey: RedisKey, value: T): Promise<string> {
    return this.client.set(redisKey, JSON.stringify(value), 'PX', this.ONE_DAY_IN_MS);
  }

  /**
   * Removes all cached keys 
   * 
   * @returns {Promise<void>}; 
   */
  public async flushAllCache(): Promise<void> {
    await this.client.flushall();
  }
}