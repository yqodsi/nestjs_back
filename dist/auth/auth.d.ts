import { UserDetails } from 'src/utils/types';
export interface AuthenticationProvider {
    validateUser(details: UserDetails): any;
    createUser(): any;
    findUser(): any;
}
