import { Email } from '../../domain/email';
import { FirstName } from '../../domain/firstName';
import { LastName } from '../../domain/lastName';
import { Password } from '../../domain/password';
import { User } from '../../domain/user';
import { IUserRepo } from '../../repos/userRepo';
import { CreateUserDTO } from './createUserDto';
import { Result } from '../../../../shared/core/result';
import { UseCase } from '../../../../shared/core/useCase';

type CreateUserSuccess = {
  type: 'CreateUserSuccess';
};

type AlreadyRegisteredError = {
  type: 'AlreadyRegisteredError';
};

type InvalidUserDetailsError = {
  type: 'InvalidUserDetailsError';
  message: string;
};

type UnexpectedError = {
  type: 'UnexpectedError';
};

export type CreateUserResult =
  | CreateUserSuccess
  | AlreadyRegisteredError
  | InvalidUserDetailsError
  | UnexpectedError;

export class CreateUserUseCase
  implements UseCase<CreateUserDTO, CreateUserResult>
{
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute(request: CreateUserDTO): Promise<CreateUserResult> {
    // Check to see if already registered
    const existingUser = await this.userRepo.findByEmail(request.email);

    // If already registered, return AlreadyRegisteredError
    if (existingUser) {
      return {
        type: 'AlreadyRegisteredError',
      };
    }

    // validation logic
    let emailOrError = Email.create(request.email);
    let firstNameOrError = FirstName.create(request.firstName);
    let lastNameOrError = LastName.create(request.lastName);
    let passwordOrError = Password.create(request.password);

    const combinedResult = Result.combine([
      emailOrError,
      passwordOrError,
      firstNameOrError,
      lastNameOrError,
    ]);

    if (combinedResult.isFailure) {
      // return left(Result.fail<void>(dtoResult.getErrorValue()));
      return {
        type: 'InvalidUserDetailsError',
        message: combinedResult.getErrorValue(),
      };
    }

    // TODO
    // why as is required here
    let userOrError = User.create({
      firstName: firstNameOrError.getValue() as FirstName,
      lastName: lastNameOrError.getValue() as LastName,
      password: passwordOrError.getValue() as Password,
      email: emailOrError.getValue() as Email,
    });

    if (userOrError.isFailure) {
      return {
        type: 'InvalidUserDetailsError',
        message: userOrError.getErrorValue() as string,
      };
    }

    let user = userOrError.getValue() as User;

    // Save user to database
    try {
      await this.userRepo.save(user);
    } catch (err) {
      // Log this to monitoring or logging plugin but don't return
      // the backend error to the client.

      return {
        type: 'UnexpectedError',
      };
    }

    return {
      type: 'CreateUserSuccess',
    };
  }
}
