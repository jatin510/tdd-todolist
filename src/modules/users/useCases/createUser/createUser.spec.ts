import { CreateUserUseCase } from './createUser';
import { IUserRepo } from '../../repos/userRepo';
import { User } from '../../domain/user';
import { CreateUserDTO } from './createUserDto';

class UserRepoSpy implements IUserRepo {
  constructor() {}

  async findByEmail(email: string): Promise<User | null> {
    return null;
  }
  async save(user: User): Promise<any> {
    return '';
  }
}

describe('Testing create User UseCase', () => {
  test('should create a user', async () => {
    const userRepoSpy = new UserRepoSpy();
    const createUserUseCase = new CreateUserUseCase(userRepoSpy);

    const createUserDto: CreateUserDTO = {
      email: 'user@example.com',
      firstName: 'firstName',
      lastName: 'lastName',
      password: 'password',
    };
    const result = await createUserUseCase.execute(createUserDto);

    expect(result.type).toEqual('CreateUserSuccess');
  });
});
