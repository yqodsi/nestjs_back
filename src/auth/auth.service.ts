import { PrismaService } from "../prisma/prisma.service";
import { Injectable, ForbiddenException } from "@nestjs/common";
import * as argon from "argon2";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { Profile } from "passport-42";

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}


  async login(user: Profile) {
    const payload = {
      name: user.username,
      sub: user.id,
    };
    return {
      // access_token: this.jwtService.sign(payload),
    };
  }
}
