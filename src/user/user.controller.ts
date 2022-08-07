import {
  Controller,
  Get,
  Param,
  Post,
  Request,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { UserService } from "./user.service";
import { v4 as uuidv4 } from "uuid";
import * as path from "path";
import { diskStorage } from "multer";

export const storage = {
  storage: diskStorage({
    destination: "./uploads/",
    filename: (req, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, "") + uuidv4();
      const extention: string = path.parse(file.originalname).ext;
      cb(null, `${filename}${extention}`);
    },
  }),
};

@Controller("user")
export class UserController {
  constructor(private userservice: UserService) {}

  @Get()
  async getUsers() {
    return this.userservice.getUsers();
  }

  @Get(":id")
  async getUser(@Param("id") id: number) {
    return this.userservice.getUser(id);
  }

  @Post("upload")
  @UseInterceptors(FileInterceptor("file", storage))
  async upload(@UploadedFile() file, @Request() req): Promise<any> {
    const user = req.user;
    return this.userservice.upload(file, user);
  }
}
