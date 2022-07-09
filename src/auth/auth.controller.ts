import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Res,
  Req,
  Redirect,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Passport42AuthGuard } from "./guards/passport.guard";
import { Request, Response } from "express";

import { Profile, use } from "passport";
import { Tokens } from "./utils/token.types";
import { JwtRtStrategy } from "./strategies/rt.strategy";
import { GetCurrentUserId, GetCurrentUser, Public } from "./common/decorators";
import { User } from "@prisma/client";
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtRtAuthGuard } from './guards/rt-jwt-auth.guard';

@Controller("auth")
export class AuthController {
  constructor(private authservice: AuthService) {}

  /**
   * Get /api/auth/login
   * This is the route user will visit for authentication
   */
  @Public()
  @Get("login")
  @UseGuards(Passport42AuthGuard)
  @HttpCode(HttpStatus.OK)
  login(@Req() req): any {
    // console.log(req.user);

    return;
  }

  /**
   * Get /api/auth/redirect
   * This is the redirect URL or route the OAuth2 provider will call.
   */
  // @Redirect("http://localhost:3000/login/success")
  @Public()
  @Get("redirect")
  @UseGuards(Passport42AuthGuard)
  @HttpCode(HttpStatus.OK)
  async redirect(
    @Req() req: any,
    @Res({ passthrough: true }) res: Response
  ): Promise<Tokens> {
    const {
      user,
    }: {
        user: Profile;

    } = req;


    if (!user) {
      res.redirect("http://localhost:3000/");
      return;
    }

    req.user = undefined;
    // console.log(req.user);

    const tokens = await this.authservice.login(user);
    await this.authservice.updateRtHash(parseInt(user.id), tokens.refreshToken);
    // res.set("Authorization", `Bearer ${tokens.accessToken}`);

    res.cookie("access_token", tokens.accessToken);
    res.cookie("refresh_token", tokens.refreshToken);

    // res.setHeader(
    //   "Set-Cookie",
    //   `access_token=${tokens.accessToken}; SameSite=Strict; Secure; Path=/; Max-Age=${process.env.JWT_EXPIRATION_TIME}`
    // );
    res.redirect("http://localhost:3000/");
  }

  /**
   * Get /api/auth/status
   * This is the route user will visit for authentication
   */

  @Get("status")
  status(@Req() req: any) {
    console.log("hohoho");
    return { msg: "hello" };
  }


  @Post("logout")
  @HttpCode(HttpStatus.OK)
  logout(@Req() req: any) {
    const user = req.user;

    return this.authservice.logout(user["id"]);
  }
  @Public()
  @UseGuards(JwtRtAuthGuard)
  @Post("refresh")
  @HttpCode(HttpStatus.OK)
  refreshToken(@Req() req: any) {
    const user = req.user;
    console.log(req.user, "refre");
    return this.authservice.refreshToken(user["id"], user["refreshToken"]);
  }
}
