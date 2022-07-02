import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import { Request } from "express";
import { Injectable } from "@nestjs/common";

@Injectable()
export class JwtRtStrategy extends PassportStrategy(Strategy, "jwt-refresh") {
  constructor() {
    super({

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_RT_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any) {
    const refreshToken = req.get("authorization").replace("Bearer ", "").trim();
    console.log("refrehToken", refreshToken);

    return {
      id: payload.sub,
      refreshToken,
    };
  }
}
