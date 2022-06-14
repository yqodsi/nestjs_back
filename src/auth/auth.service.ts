import { PrismaService } from "../prisma/prisma.service";
import { Injectable, ForbiddenException } from "@nestjs/common";
import * as argon from "argon2";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { Profile } from "passport-42";
import { AuthenticationProvider } from "./utils/auth";
import { UserDetails } from "./utils/types";
import { User } from "@prisma/client";
@Injectable()
export class AuthService implements AuthenticationProvider {
  constructor(private prisma: PrismaService) {}

  async validateUser(details: UserDetails) {
    const { twentyFourId } = details;
    console.log(twentyFourId);

    const user = await this.prisma.user.findUnique({
      where: {
        twentyFourId,
      },
    });
    console.log(user);
    if (user) return user;

    return await this.createUser(details);
  }
  async createUser(details: UserDetails) {
    console.log("creating user", details);
    const user = await this.prisma.user.create({
      data: {
        twentyFourId: details.twentyFourId,
        email: details.email,
        avatarUrl: details.avatar,
        username: details.username,
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
}
