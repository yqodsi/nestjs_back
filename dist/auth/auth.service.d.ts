import { PrismaService } from "../prisma/prisma.service";
import { AuthenticationProvider } from "./utils/auth";
import { UserDetails } from "./utils/types";
export declare class AuthService implements AuthenticationProvider {
    private prisma;
    constructor(prisma: PrismaService);
    validateUser(details: UserDetails): Promise<import(".prisma/client").User>;
    createUser(details: UserDetails): void;
    findUser(details: UserDetails): void;
}
