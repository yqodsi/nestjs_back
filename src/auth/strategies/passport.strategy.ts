import { Strategy, Profile, VerifyCallback } from 'passport-42';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { userInfo } from 'os';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class Passport42Strategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super(
      {
        clientID: process.env.PASSPORT_ID,
        clientSecret: process.env.PASSPORT_SECRET,
        callbackURL: process.env.PASSPORT_REDIRECT_URL,

      },
    );
  }
  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const { username, id, photos, emails } = profile;
    const email = emails[0].value;
    const avatar = photos[0].value;

    console.log(username, id, avatar, email);
    return profile;

  }
}
