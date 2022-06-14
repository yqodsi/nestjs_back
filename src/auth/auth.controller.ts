import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Res,
  Req,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Passport42AuthGuard } from "./guards/passport.guard";
import { Response } from "express";
import { Profile } from "passport-42";
import { AuthenticationGuard } from './guards/authentication.guard';

@Controller("auth")
export class AuthController {
  constructor(private authservice: AuthService) {}

  /**
   * Get /api/auth/login
   * This is the route user will visit for authentication
   */

  @Get("login")
  @UseGuards(Passport42AuthGuard)
  login(): void {
    return;
  }

  /**
   * Get /api/auth/redirect
   * This is the redirect URL or route the OAuth2 provider will call.
   */

  @Get("redirect")
  @UseGuards(Passport42AuthGuard)
  async redirect(@Res() res: Response) {
    res.sendStatus(200);
  }

  /**
   * Get /api/auth/status
   * This is the route user will visit for authentication
   */
  @Get("status")
  status(@Req() req: any): string {
    return req.user;
  }

  /**
   * Get /api/auth/logout
   * This is the route user will visit for authentication
   */
  @UseGuards(AuthenticationGuard)
  @Get("logout")
  logout() {
    return {msg : 'lalal'}
  }
}
