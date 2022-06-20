import { PrismaService } from "../prisma/prisma.service";
import {
  Injectable,
} from "@nestjs/common";
import { AuthenticationProvider } from "./utils/auth";
import { UserDetails } from "./utils/types";
import { User } from "@prisma/client";

@Injectable()
export class AuthService implements AuthenticationProvider {
  constructor(
    private prisma: PrismaService,
  ) {}

  async validateUser(details: UserDetails) {
    const { twentyFourId } = details;

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
    res.sendStatus(200);
  }
}
