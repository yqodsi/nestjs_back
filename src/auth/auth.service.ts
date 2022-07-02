import { PrismaService } from "../prisma/prisma.service";
import { ForbiddenException, Injectable, Redirect } from "@nestjs/common";
import { AuthenticationProvider } from "./utils/auth";
import { UserDetails } from "./utils/types";
import { User } from "@prisma/client";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { Tokens } from "./utils/token.types";
import { Profile } from 'passport-42';
@Injectable()
export class AuthService implements AuthenticationProvider {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async validateUser(details: UserDetails) {
    const { twentyFourId } = details;

    const user = await this.prisma.user.findUnique({
      where: {
        twentyFourId,
      },
    });
    if (user) {
      await this.prisma.user.update({
        where: {
          twentyFourId,
        },
        data: {
          firstTime: false,
        },
      });
      return user;
    }
    return await this.createUser(details);
  }

  async createUser(details: UserDetails) {
    console.log("creating user", details);
    return await this.prisma.user.create({
      data: {
        twentyFourId: details.twentyFourId,
        email: details.email,
        avatarUrl: details.avatar,
        username: details.username,
        firstTime: true,
      },
    });
  }

  async findUser(twentyFourId: string): Promise<User | undefined> {
    return await this.prisma.user.findUnique({
      where: {
        twentyFourId,
      },
    });
  }

  async login(user: Profile): Promise<Tokens> {
    const payload = { name: user.username, sub: user.id };
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(payload, {
        expiresIn: '60s', // expires in 15 minutes
        secret: process.env.JWT_SECRET,
      }),
      this.jwtService.signAsync(payload, {
        expiresIn: 60 * 60 * 24 * 7, // expires in 7 days
        secret: process.env.JWT_RT_SECRET,
      }),
    ]);
    return {
      accessToken: at,
      refreshToken: rt,
    };
  }

  async logout(userId: number) {
    await this.prisma.user.updateMany({
      where: {
        id: userId,
        hashedRt: {
          not: null,
        },
      },
      data: {
        hashedRt: null,
      },
    });
  }

  async refreshToken(userId: number, rt: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      }
    })
    if (!user)
      throw new ForbiddenException("access denied");
    const rtMatches = await bcrypt.compare(rt, user.hashedRt);
    if (!rtMatches)
      throw new ForbiddenException("access denied");
    const tokens = await this.login(user);
    await this.updateRtHash(user.id, tokens.refreshToken);
    return tokens;
  }

  async hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  async updateRtHash(userId: number, rt: string) {
    const hash = await this.hashData(rt);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRt: hash,
      },
    });
  }
}
