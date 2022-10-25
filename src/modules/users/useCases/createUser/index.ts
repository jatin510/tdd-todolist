import { UserRepoSpy } from '../../testObjects/userRepoSpy';
import { CreateUserController } from '../createUserController';
import { CreateUserUseCase } from './createUser';

// TODO
// update the repo
const userRepoSpy = new UserRepoSpy([]);

const createUserUseCase = new CreateUserUseCase(userRepoSpy);
const createUserController = new CreateUserController(createUserUseCase);

export { createUserUseCase, createUserController };
