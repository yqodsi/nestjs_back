import {
  CacheModule,
  Module,
  NestModule,
  Inject,
  MiddlewareConsumer,
} from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { PrismaModule } from "./prisma/prisma.module";
import { ConfigModule } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";
import { RedisModule } from "./redis/redis.module";
import * as session from "express-session";
import * as RedisStore from "connect-redis";

import {
  session as passportSession,
  initialize as passportInitialize,
} from "passport";
@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
    }),
    PassportModule.register({ session: true }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    PrismaModule,
    RedisModule,
  ],
})
export class AppModule implements NestModule {
  constructor(@Inject("REDIS_CLIENT") private readonly redis) {}
  configure(consumer: MiddlewareConsumer) {

    consumer.apply(
        session({
          name: "kha",
          saveUninitialized: false,
          secret: "sup3rs3cr3t",
          resave: false,
          store: new (RedisStore(session))({
            client: this.redis,
            logErrors: true,
          }),
          cookie: {
            // sameSite: true,
            // httpOnly: false,
            maxAge: 60000,
          },
        }),
        // passportInitialize(),
        // passportSession()
      )
      .forRoutes("*");
  }
}
