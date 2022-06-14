import { UserDetails } from '../utils/types';
export interface AuthenticationProvider {
    validateUser(details: UserDetails): any;
    createUser(details: UserDetails): any;
    findUser(details: UserDetails): any;
}
