import { Strategy, Profile, VerifyCallback } from 'passport-42';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { log } from 'console';

@Injectable()
export class Passport42Strategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      clientID: process.env.PASSPORT_ID,
      clientSecret: process.env.PASSPORT_SECRET,
      callbackURL: process.env.PASSPORT_REDIRECT_URL,
      profileFields: {
        id: function (obj) {
          return String(obj.id);
        },
        login: 'login',
        name: 'displayname',
        last_name: 'last_name',
        first_name: 'first_name',
        email: 'email',
        avatarUrl: 'image_url',
      },
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    const { email, login, name } = profile;
    console.log(email, login, name);
    const user = { email };
    done(null, user);
  }
}
