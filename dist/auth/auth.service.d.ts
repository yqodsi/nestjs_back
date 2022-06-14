import { PrismaService } from "../prisma/prisma.service";
import { AuthenticationProvider } from "./utils/auth";
import { UserDetails } from "./utils/types";
import { User } from "@prisma/client";
export declare class AuthService implements AuthenticationProvider {
    private prisma;
    constructor(prisma: PrismaService);
    validateUser(details: UserDetails): Promise<void | User>;
    createUser(details: UserDetails): Promise<void>;
    findUser(twentyFourId: string): Promise<User | undefined>;
}
