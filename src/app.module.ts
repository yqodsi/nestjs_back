import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { PrismaModule } from "./prisma/prisma.module";
import { ConfigModule } from "@nestjs/config";
import { PassportModule } from '@nestjs/passport';
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { ChatModule } from './chat/chat.module';
import { GameModule } from './game/game.module';
// import { TwoFactorAuthenticationModule } from './two-factor-authentication/two-factor-authentication.module';
import { UserModule } from './user/user.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    PrismaModule,
    ChatModule,
    GameModule,
    // TwoFactorAuthenticationModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    }
  ],
})
export class AppModule {}
