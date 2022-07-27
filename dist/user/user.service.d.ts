import { PrismaService } from "src/prisma/prisma.service";
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    users: any;
    getUsers(): import(".prisma/client").PrismaPromise<import(".prisma/client").User[]>;
    getUser(id: number): any;
    upload(file: any, user: any): Promise<any>;
}
