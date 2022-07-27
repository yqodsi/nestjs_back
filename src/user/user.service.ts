import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  users: any = [
    {
      id: 1,
      name: "John",
      email: "fff",
    },
    {
      id: 2,
      name: "John",
      email: "fff",
    },
  ];
  getUsers() {
    return this.prisma.user.findMany();
  }
  getUser(id: number) {
    console.log(this.users.find((user) => user.id == id));

    return this.users.find((user) => user.id == id);
  }

  async upload(file, user): Promise<any> {
    const { id } = user;
    console.log(file, id);
    const us = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        avatarUrl: process.cwd() + "/uploads/profileimages/" + file.filename,
      },
    });
    return us.avatarUrl;
  }
}
