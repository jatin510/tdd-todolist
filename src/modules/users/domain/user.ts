import { Guard } from '@shared/core/guard';
import { Result } from '@shared/core/result';
import { Entity } from '@shared/domain/entity';
import { FirstName } from './firstName';
import { LastName } from './lastName';
import { Password } from './password';

export interface UserProps {
  email: string;
  firstName: FirstName;
  lastName: LastName;
  password: Password;
}

export class User extends Entity<UserProps> {
  private constructor(userProps: UserProps) {
    super(userProps);
  }

  get firstName() {
    return this.props.firstName;
  }

  get lastName() {
    return this.props.lastName;
  }

  get name() {
    return this.props.firstName + ' ' + this.props.lastName;
  }

  get password() {
    return this.props.password;
  }

  get email() {
    return this.props.email;
  }

  public static create(userProps: UserProps): Result<User> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: userProps.email, argumentName: 'email' },
      { argument: userProps.firstName, argumentName: 'firstName' },
      { argument: userProps.lastName, argumentName: 'lastName' },
      { argument: userProps.password, argumentName: 'password' },
    ]);

    if (guardResult.isFailure) {
      return Result.fail<User>(guardResult.getErrorValue());
    }

    const user = new User(userProps);

    return Result.ok<User>(user);
  }
}
