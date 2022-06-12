import { AuthService } from "./auth.service";
import { Response } from "express";
export declare class AuthController {
    private authservice;
    constructor(authservice: AuthService);
    login(): void;
    spotifyAuthRedirect(req: any, res: Response): Promise<Response>;
    status(req: any): string;
    logout(): void;
}
