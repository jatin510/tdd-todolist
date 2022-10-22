import { User } from '../domain/user';
import { IUserRepo } from '../repos/userRepo';

export class UserRepoSpy implements IUserRepo {
  private users: User[];
  private timesSaveCalled: number;

  constructor(users: User[]) {
    this.users = users;
    this.timesSaveCalled = 0;
  }

  get getTimesSaveCalled(): number {
    return this.timesSaveCalled;
  }

  async findByEmail(email: string): Promise<User | null> {
    const found = this.users.find((u) => u.email.getValue() === email);

    if (!found) {
      return null;
    }

    return found;
  }

  async save(user: User): Promise<any> {
    this.timesSaveCalled++;
  }
}
