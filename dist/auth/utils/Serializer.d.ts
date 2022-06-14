import { PassportSerializer } from "@nestjs/passport";
import { AuthService } from "../auth.service";
import { User } from "@prisma/client";
export declare class SessionSerializer extends PassportSerializer {
    private authService;
    constructor(authService: AuthService);
    serializeUser(user: User, done: (err: Error, user: User) => void): void;
    deserializeUser(user: User, done: (err: Error, user: User) => void): Promise<void>;
}
