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
      },
      async (
        accessToken: string,
        refreshToken: string,
        expires_in: number,
        profile: Profile,
        done: VerifyCallback,
      ): VerifyCallback => {
        const user = await this.prisma.user.findUnique({
          where: {
            twentyFourId: profile.id,
          },
        });

        if (!user) {
          await this.prisma.user.create({
            data: {
              twentyFourId: profile.id as string,
              email: profile.email as string,
              avatarUrl: profile.avatarUrl as string,
              login: profile.login as string,
            },
          });
        }
        else {
          console.log( process.env.JWT_SECRET);
          console.log("User Exist!" + user);
        }

        return done(null, profile, {
          accessToken,
          refreshToken,
          expires_in,
        });
      },
    );
  }
}
