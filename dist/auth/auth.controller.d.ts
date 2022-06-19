import { AuthService } from "./auth.service";
import { Response } from "express";
export declare class AuthController {
    private authservice;
    constructor(authservice: AuthService);
    login(): void;
    redirect(res: Response): Promise<void>;
    status(req: any): string;
    logout(res: Response): void;
}
