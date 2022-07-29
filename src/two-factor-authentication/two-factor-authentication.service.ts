// import { Injectable } from "@nestjs/common";
// import { authenticator } from "otplib";
// import User from "@prisma/client";
// import { UserService } from '../user/user.service';

// @Injectable()
// export class TwoFactorAuthenticationService {
//   constructor(
//     private readonly usersService: UserService,
//   ) {}

//   async generateTwoFactorAuthenticationSecret(user: User) {
//     const secret = authenticator.generateSecret();

//     const otpauthUrl = authenticator.keyuri(
//       user.email,
//       "TWO_FACTOR_AUTHENTICATION_APP_NAME",
//       secret
//     );

//     await this.usersService.setTwoFactorAuthenticationSecret(secret, user.id);

//     return {
//       secret,
//       otpauthUrl,
//     };
//   }
// }
