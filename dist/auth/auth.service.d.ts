import { PrismaService } from '../prisma/prisma.service';
export declare class AuthService {
    private prisma;
    constructor(prisma: PrismaService);
    signup(): Promise<string>;
    signin(): Promise<void>;
}
