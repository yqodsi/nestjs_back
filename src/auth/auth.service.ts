import { PrismaService } from "../prisma/prisma.service";
import { Injectable, ForbiddenException } from "@nestjs/common";
import * as argon from "argon2";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { Profile } from "passport-42";
import { AuthenticationProvider } from "./utils/auth";
import { UserDetails } from "./utils/types";

@Injectable()
export class AuthService implements AuthenticationProvider {
  constructor(private prisma: PrismaService) {}

  async validateUser(details: UserDetails) {
    const { id } = details;
    const idParsed = parseInt(id);
    const user = await this.prisma.user.findUnique({
      where: {
        id: idParsed,
      },
    });
    if (user) return user;
    const newUser = await this.createUser(details);
  }
  createUser(details: UserDetails) {
    console.log('creating user');

  }
  findUser(details: UserDetails) {}
}
