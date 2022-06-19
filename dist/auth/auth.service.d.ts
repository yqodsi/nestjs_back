import { PrismaService } from "../prisma/prisma.service";
import { AuthenticationProvider } from "./utils/auth";
import { UserDetails } from "./utils/types";
import { User } from "@prisma/client";
export declare class AuthService implements AuthenticationProvider {
    private prisma;
    constructor(prisma: PrismaService);
    validateUser(details: UserDetails): Promise<User>;
    createUser(details: UserDetails): Promise<User>;
    findUser(twentyFourId: string): Promise<User | undefined>;
    redirect(res: any): Promise<void>;
}
