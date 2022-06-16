import { CacheModule, Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { PrismaModule } from "./prisma/prisma.module";
import { ConfigModule } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";
import * as redisStore from "cache-manager-redis-store";

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: "localhost",
      port: 6379,
    }),
    PassportModule.register({ session: true }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    PrismaModule,
  ],
})
export class AppModule {}
