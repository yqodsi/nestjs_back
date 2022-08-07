import { UserService } from '../user/user.service';
import { Profile } from 'passport-42';
import { Response } from "express";
export declare class TwoFactorAuthenticationService {
    private readonly usersService;
    constructor(usersService: UserService);
    generateTwoFactorAuthenticationSecret(user: Profile): Promise<{
        secret: string;
        otpauthUrl: string;
    }>;
    pipeQrCodeStream(stream: Response, otpauthUrl: string): Promise<any>;
}
