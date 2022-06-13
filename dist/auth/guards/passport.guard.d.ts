import { ExecutionContext } from "@nestjs/common";
declare const Passport42AuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class Passport42AuthGuard extends Passport42AuthGuard_base {
    canActivate(context: ExecutionContext): Promise<any>;
}
export {};
