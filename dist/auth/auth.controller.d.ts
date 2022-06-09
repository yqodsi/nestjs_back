import { AuthService } from './auth.service';
import { Response } from 'express';
export declare class AuthController {
    private authservice;
    constructor(authservice: AuthService);
    login(): void;
    spotifyAuthRedirect(req: any, res: Response): Promise<Response>;
    status(): void;
    logout(): void;
}
