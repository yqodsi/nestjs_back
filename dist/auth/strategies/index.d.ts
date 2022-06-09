import { PrismaService } from '../../prisma/prisma.service';
declare const Passport42Strategy_base: new (...args: any[]) => any;
export declare class Passport42Strategy extends Passport42Strategy_base {
    private prisma;
    constructor(prisma: PrismaService);
}
export {};
