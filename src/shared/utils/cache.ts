import config from 'config';
import IORedis, { Redis as RedisClient, RedisKey } from 'ioredis';

import { RedisConfigProps } from '@/config/default';

const redisConfig: RedisConfigProps = config.get<
  RedisConfigProps
>('app.resources.redis');

export class CacheManager {
  private client: RedisClient;
  private connected: boolean = false;

  private ONE_DAY_IN_MS: number = 86_400_000;

  constructor() {
    if (!this.connected) {
      this.client = new IORedis({
        ...redisConfig
      });

      this.connected = true;
    }
  }

  public async delete(redisKey: RedisKey): Promise<void> {
    await this.client.del(redisKey);
  }

  public async get<T>(redisKey: RedisKey): Promise<T|null> {
    const data: string = await this.client.get(redisKey);

    return data ? JSON.parse(data) as T : null;
  }

  public async set<T>(redisKey: RedisKey, value: T): Promise<string> {
    return this.client.set(redisKey, JSON.stringify(value), 'PX', this.ONE_DAY_IN_MS);
  }

  public async flushAllCache(): Promise<string> {
    return this.client.flushall();
  }
}