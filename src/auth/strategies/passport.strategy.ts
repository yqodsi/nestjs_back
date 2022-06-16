import { Strategy, Profile, VerifyCallback } from "passport-42";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, Inject } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { userInfo } from "os";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { AuthenticationProvider } from "../utils/auth";
import { AuthService } from "../auth.service";

@Injectable()
export class Passport42Strategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      clientID: process.env.PASSPORT_ID,
      clientSecret: process.env.PASSPORT_SECRET,
      callbackURL: process.env.PASSPORT_REDIRECT_URL,
    });
  }
  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const { username, id: twentyFourId, photos, emails } = profile;
    const email = emails[0].value as string;
    const avatar = photos[0].value as string;
    const details = { username, twentyFourId, avatar, email };
    return this.authService.validateUser(details);
  }
}
