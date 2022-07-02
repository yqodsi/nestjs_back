import { AuthService } from "./auth.service";
import { Response } from "express";
import { Tokens } from "./utils/token.types";
export declare class AuthController {
    private authservice;
    constructor(authservice: AuthService);
    login(req: any): any;
    redirect(req: any, res: Response): Promise<Tokens>;
    status(req: any): {
        msg: string;
    };
    logout(req: any): void;
    refreshToken(req: any): Promise<Tokens>;
}
