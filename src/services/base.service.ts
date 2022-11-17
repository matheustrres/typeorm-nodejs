import { CacheManager } from '../shared/utils/cache';

interface IBaseService {
  getCacheKey(id: string): string;
}

export abstract class BaseService implements IBaseService {
  constructor(protected cacheManager: CacheManager = new CacheManager()) {}

  public abstract getCacheKey(id: string): string;
}