import { AuthService } from "./auth.service";
import { Response } from "express";
export declare class AuthController {
    private authservice;
    constructor(authservice: AuthService);
    login(): void;
    redirect(res: Response): Promise<void>;
    status(req: any): void;
    logout(res: Response): void;
}
