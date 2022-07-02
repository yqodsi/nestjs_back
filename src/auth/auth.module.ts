import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { Passport42Strategy } from "./strategies/passport.strategy";
import { PrismaModule } from "../prisma/prisma.module";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategies/jwt.startegy";
import { JwtRtStrategy } from "./strategies/rt.strategy";

@Module({
  imports: [PrismaModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [Passport42Strategy, AuthService, JwtStrategy, JwtRtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
