import { Strategy, Profile, VerifyCallback } from "passport-42";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";

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
  async validate(accessToken: number, refreshToken: number, profile: Profile) {
    const { username, id: twentyFourId, photos, emails } = profile;
    const email = emails[0].value as string;
    const avatar = photos[0].value as string;
    const details = { username, twentyFourId, avatar, email };
    return await this.authService.validateUser(details);
  }
}