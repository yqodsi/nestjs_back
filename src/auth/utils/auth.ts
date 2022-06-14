import { UserDetails } from '../utils/types';
import { User } from '@prisma/client';
export interface AuthenticationProvider {
  validateUser(details: UserDetails);
  createUser(details: UserDetails);
  findUser(id: string): Promise<User | undefined>;
}