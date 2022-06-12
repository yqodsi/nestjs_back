import { PrismaService } from '../prisma/prisma.service';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { Profile } from 'passport-42';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  // async signup(dto: AuthDto) {
  //   //generate password hash
  //   const hash = await argon.hash(dto.password);
  //   //save new user in db
  //   try {
  //     const user = await this.prisma.user.create({
  //       data: {
  //         email: dto.email,
  //         hash,
  //       },
  //     });

  //     delete user.hash;

  //     //return new user
  //     return user;
  //   } catch (err) {
  //     if (err instanceof PrismaClientKnownRequestError) {
  //       if (err.code === 'P2002') {
  //         throw new ForbiddenException('user already exist');
  //       }
  //     }
  //     throw err;
  //   }
  // }

  // async signin(dto: AuthDto) {
  //   //find the user by email
  //   const user = await this.prisma.user.findUnique({
  //     where: {
  //       email: dto.email,
  //     },
  //   });
  //   // if user doesn't exist throw ForbiddenException
  //   if (!user) throw new ForbiddenException('Credentials incorrect');
  //   //compare password
  //   const pwMatch = await argon.verify(user.hash, dto.password);
  //   //if password incorrect throw ForbiddenException
  //   if (!pwMatch)
  //     throw new ForbiddenException('Credentials incorrect');

  //   delete user.hash;
  //   // send back user
  //   return user;
  // }

  async login(user: Profile) {
    const payload = {
      name: user.username,
      sub: user.id,
    };
    return {

      access_token: this.jwtService.sign(payload),
    }
  }
}
