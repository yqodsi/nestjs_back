import { Module } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { TwoFactorAuthenticationController } from './two-factor-authentication.controller';
import { TwoFactorAuthenticationService } from './two-factor-authentication.service';

@Module({
  controllers: [TwoFactorAuthenticationController],
  providers: [TwoFactorAuthenticationService, UserService],



})
export class TwoFactorAuthenticationModule {}
