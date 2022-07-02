import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import { Request } from "express";
import { Injectable, Req } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    return {
      id: payload.sub,
      username: payload.name,
    };
  }

}
