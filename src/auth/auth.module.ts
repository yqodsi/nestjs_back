import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { Passport42Strategy } from "./strategies/passport.strategy";
import { PassportModule } from "@nestjs/passport";
import { SessionSerializer } from "./utils/Serializer";
import { PrismaModule } from '../prisma/prisma.module';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [PassportModule.register({ session: true }), PrismaModule, RedisModule],
  controllers: [AuthController],
  providers: [
    Passport42Strategy,
    SessionSerializer,
    AuthService,
  ],
})
export class AuthModule {}
