import { PrismaService } from "../prisma/prisma.service";
import { ForbiddenException, Injectable, Redirect } from "@nestjs/common";
import { AuthenticationProvider } from "./utils/auth";
import { UserDetails } from "./utils/types";
import { User } from "@prisma/client";
import { JwtService } from "@nestjs/jwt";
import { Token } from "./utils/token.types";
import { Profile } from "passport-42";
import * as argon from "argon2";

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

  async login(user: Profile): Promise<Token> {
    const payload = { name: user.username, sub: user.id };
    const at = await this.jwtService.signAsync(payload, {
      expiresIn: "1h",
      secret: process.env.JWT_SECRET,
    });
    return {
      accessToken: at,
    };
  }

  async logout(userId: number) {}

  test() {
    return { msg: "hello" };
  }
  async hashData(data: string) {
    return await argon.hash(data);
  }
}
