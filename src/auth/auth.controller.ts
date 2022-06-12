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
import { AuthDto } from "./dto";
import { Passport42AuthGuard } from "./guards/passport.guard";
import { Response } from "express";
import { Profile } from "passport-42";
import { JwtAuthGuard } from './guards/jwt.guard';

@Controller("auth")
export class AuthController {
  constructor(private authservice: AuthService) {}

  // @Post('signup')
  // signup(@Body() dto: AuthDto) {
  //   return this.authservice.signup(dto);
  // }

  // @Post('signin')
  // signin(@Body() dto: AuthDto) {
  //   return this.authservice.signin(dto);
  // }

  @Get("login")
  @UseGuards(Passport42AuthGuard)

  login(): void {
    return;
  }

  @Get("redirect")
  @UseGuards(Passport42AuthGuard)

  async spotifyAuthRedirect(
    @Req() req: any,
    @Res() res: Response
    ): Promise<Response> {
      const {
        user,
        authInfo,
      }: {
        user: Profile;
        authInfo: {
          accessToken: string;
          refreshToken: string;
          expires_in: number;
        };
      } = req;

      if (!user) {
        res.redirect("/");
        return;
      }

      req.user = undefined;

      const jwt = this.authservice.login(user);
      res.set("authorization", `Bearer ${jwt}`);
      console.log(jwt);
      
      return res.status(201).json({ authInfo, user });
    }

    @UseGuards(JwtAuthGuard)
    @Get("status")
    status(@Req() req: any): string {
    return req.user;
  }

  @Get("logout")
  logout() {}
}
