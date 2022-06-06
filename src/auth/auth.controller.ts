import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Res,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { Passport42AuthGuard } from './guards';
import { Response } from 'express';
import * as passport from 'passport';

@Controller('auth')
export class AuthController {
  constructor(private authservice: AuthService) {}
  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.authservice.signup(dto);
  }
  @Post('signin')
  signin(@Body() dto: AuthDto) {
    return this.authservice.signin(dto);
  }
  @Get('login')
  @UseGuards(Passport42AuthGuard)
  login() {}
  @Get('redirect')
  @UseGuards(Passport42AuthGuard)
  redirect(@Res() res: Response, @Req() req) {
    console.log('redirect');
    const user = req.user;
    console.log(user);
    res.redirect('/');
  }

  @Get('status')
  status() {}

  @Get('logout')
  logout() {}
}
