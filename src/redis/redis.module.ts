import { Module } from "@nestjs/common";
import * as Redis from "redis";
import * as session from "express-session";
import * as connectRedis from 'connect-redis';

@Module({
  providers: [
    {
      provide: 'REDIS_OPTIONS',
      useValue: {
        url: 'redis://localhost:6379'
      }
    },
    {
      inject: ['REDIS_OPTIONS'],
      provide: 'REDIS_CLIENT',
      useFactory: async (options: { url: string }) => {
        const client = Redis.createClient(options);
        await client.connect();
        return client;
      }
    }
  ],
  exports: ['REDIS_CLIENT'],
})
export class RedisModule {}