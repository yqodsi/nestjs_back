import { Profile } from "passport-42";
import { AuthService } from "../auth.service";
declare const Passport42Strategy_base: new (...args: any[]) => any;
export declare class Passport42Strategy extends Passport42Strategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(accessToken: string, refreshToken: string, profile: Profile): Promise<void>;
}
export {};
