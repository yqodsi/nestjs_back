import { Injectable } from "@nestjs/common";
import { authenticator } from "otplib";
import User from "@prisma/client";
import { UserService } from '../user/user.service';
import { Profile } from 'passport-42';
import { toFileStream } from "qrcode";
import { Response } from "express";


@Injectable()
export class TwoFactorAuthenticationService {
  constructor(private readonly usersService: UserService) {}

  async generateTwoFactorAuthenticationSecret(user: Profile) {
    const secret = authenticator.generateSecret();

    const otpauthUrl = authenticator.keyuri(
      user.email,
      "TWO_FACTOR_AUTHENTICATION_APP_NAME",
      secret
    );

    await this.usersService.setTwoFactorAuthenticationSecret(secret, user.id);

    return {
      secret,
      otpauthUrl,
    };
  }

  public async pipeQrCodeStream(stream: Response, otpauthUrl: string) {
    return toFileStream(stream, otpauthUrl);
  }
}
