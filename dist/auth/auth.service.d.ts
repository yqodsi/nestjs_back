import { PrismaService } from "../prisma/prisma.service";
import { Profile } from "passport-42";
export declare class AuthService {
    private prisma;
    constructor(prisma: PrismaService);
    login(user: Profile): Promise<{}>;
}
