import { Strategy } from "passport-jwt";
import { Request } from "express";
declare const JwtRtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtRtStrategy extends JwtRtStrategy_base {
    constructor();
    validate(req: Request, payload: any): Promise<{
        id: any;
        refreshToken: string;
    }>;
}
export {};
