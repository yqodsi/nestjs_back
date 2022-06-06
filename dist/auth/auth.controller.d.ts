import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { Response } from 'express';
export declare class AuthController {
    private authservice;
    constructor(authservice: AuthService);
    signup(dto: AuthDto): Promise<import(".prisma/client").User>;
    signin(dto: AuthDto): Promise<import(".prisma/client").User>;
    login(): void;
    redirect(res: Response, req: any): void;
    status(): void;
    logout(): void;
}
