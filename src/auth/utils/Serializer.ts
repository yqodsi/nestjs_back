import { PassportSerializer } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { AuthService } from "../auth.service";
import { User } from "@prisma/client";

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private authService: AuthService) {
    super();
  }
  serializeUser(user: User, done: (err: Error, user: User) => void) {
    done(null, user);
  }
  async deserializeUser(user: User, done: (err: Error, user: User) => void) {
    const userDB = await this.authService.findUser(user.twentyFourId);
    console.log("userdb", userDB);
    return userDB ? done(null, userDB) : done(null, null);
  }
}
