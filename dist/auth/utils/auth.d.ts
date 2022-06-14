import { UserDetails } from '../utils/types';
import { User } from '@prisma/client';
export interface AuthenticationProvider {
    validateUser(details: UserDetails): any;
    createUser(details: UserDetails): any;
    findUser(id: string): Promise<User | undefined>;
}
