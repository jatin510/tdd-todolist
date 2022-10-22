import { User } from '../domain/user';

export interface IUserRepo {
  findByEmail(email: string): Promise<User>;
  save(user: User): Promise<any>;
}
