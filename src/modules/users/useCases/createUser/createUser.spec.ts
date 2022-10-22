import { CreateUserUseCase } from './createUser';
import { UserRepoSpy } from '../../testObjects/userRepoSpy';
import { CreateUserDTO } from './createUserDto';

describe('Testing create User UseCase', () => {
  let userRepoSpy: UserRepoSpy;

  test('should not be able to create a user, with invalid password', async () => {
    const createUserDto: CreateUserDTO = {
      email: 'jatin@gmail.com',
      firstName: 'jatin',
      lastName: 'parihar',
      password: 'j',
    };

    userRepoSpy = new UserRepoSpy([]);
    const createUserUseCase = new CreateUserUseCase(userRepoSpy);
    const result = await createUserUseCase.execute(createUserDto);

    expect(result.type).toEqual('InvalidUserDetailsError');
    expect(userRepoSpy.getTimesSaveCalled).toEqual(0);
  });

  test('should create a new user', async () => {
    const createUserDto: CreateUserDTO = {
      email: 'user@example.com',
      firstName: 'firstName',
      lastName: 'lastName',
      password: 'password',
    };

    userRepoSpy = new UserRepoSpy([]);
    const createUserUseCase = new CreateUserUseCase(userRepoSpy);

    const result = await createUserUseCase.execute(createUserDto);
    expect(result.type).toEqual('CreateUserSuccess');
    expect(userRepoSpy.getTimesSaveCalled).toEqual(1);
  });
});
