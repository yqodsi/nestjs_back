import { AuthService } from "./auth.service";
import { Response } from "express";
export declare class AuthController {
    private authservice;
    constructor(authservice: AuthService);
    login(req: any): any;
    redirect(req: any, res: Response): Promise<void>;
    status(req: any, res: any): {
        msg: string;
    };
    logout(req: any, res: any): void;
    test(): {
        msg: string;
    };
}
