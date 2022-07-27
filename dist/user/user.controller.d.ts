import { UserService } from "./user.service";
export declare const storage: {
    storage: any;
};
export declare class UserController {
    private userservice;
    constructor(userservice: UserService);
    getUsers(): Promise<import(".prisma/client").User[]>;
    getUser(id: number): Promise<any>;
    upload(file: any, req: any): Promise<any>;
}
