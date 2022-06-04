import { AuthService } from './auth.service';
export declare class AuthController {
    private authservice;
    constructor(authservice: AuthService);
    signup(dto: any): Promise<string>;
    signin(dto: any): Promise<void>;
}
