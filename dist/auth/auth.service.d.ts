import { PrismaService } from "../prisma/prisma.service";
import { AuthenticationProvider } from "./utils/auth";
import { UserDetails } from "./utils/types";
import { User } from "@prisma/client";
import { JwtService } from "@nestjs/jwt";
import { Token } from "./utils/token.types";
import { Profile } from "passport-42";
export declare class AuthService implements AuthenticationProvider {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    validateUser(details: UserDetails): Promise<User>;
    createUser(details: UserDetails): Promise<User>;
    findUser(twentyFourId: string): Promise<User | undefined>;
    login(user: Profile): Promise<Token>;
    logout(userId: number): Promise<void>;
    test(): {
        msg: string;
    };
    hashData(data: string): Promise<string>;
}
