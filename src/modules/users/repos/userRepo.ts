import { User } from '../domain/user';

export interface IUserRepo {
  findByEmail(email: string): Promise<User | null>;
  save(user: User): Promise<any>;
}
