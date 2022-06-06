declare const Passport42AuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class Passport42AuthGuard extends Passport42AuthGuard_base {
    handleRequest(err: Error, user: any, info: any): any;
}
export {};
