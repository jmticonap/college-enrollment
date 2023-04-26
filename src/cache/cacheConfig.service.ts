import {
  CacheModuleOptions,
  CacheOptionsFactory,
  Injectable,
} from '@nestjs/common';
import { env } from 'node:process';

@Injectable()
class CacheConfigService implements CacheOptionsFactory {
  createCacheOptions(): CacheModuleOptions {
    return {
      ttl: Number(env.CACHE_TTL) || 2000,
      isGlobal: true,
    };
  }
}

export default CacheConfigService;
