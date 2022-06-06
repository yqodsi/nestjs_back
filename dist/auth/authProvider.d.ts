export interface AuthenticationProvider {
    validateUser(details: any): any;
    createUser(): any;
    findUser(): any;
}
