import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Passport42Strategy } from './strategies';

@Module({
  controllers: [AuthController],
  providers: [AuthService, Passport42Strategy],
})
export class AuthModule {}
