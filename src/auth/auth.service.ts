import { PrismaService } from "../prisma/prisma.service";
import {
  Injectable,
  ForbiddenException,
  Inject,
  CACHE_MANAGER,
} from "@nestjs/common";
import * as argon from "argon2";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { Profile } from "passport-42";
import { AuthenticationProvider } from "./utils/auth";
import { UserDetails } from "./utils/types";
import { User } from "@prisma/client";
import { Cache } from "cache-manager";

@Injectable()
export class AuthService implements AuthenticationProvider {
  constructor(
    private prisma: PrismaService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
  ) {}

  async validateUser(details: UserDetails) {
    const { twentyFourId } = details;
    console.log(twentyFourId);

    const user = await this.prisma.user.findUnique({
      where: {
        twentyFourId,
      },
    });
    if (user) return user;
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
  
  async redirect(res) {
    await this.cacheManager.set("redirect", true);
    const chachedItem = await this.cacheManager.get("redirect");
    console.log(chachedItem);

    res.sendStatus(200);
  }
}
