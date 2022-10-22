import { Result } from '@shared/core/result';
import { ValueObject } from '@shared/domain/valueObject';

export interface PasswordProps {
  value: string;
}

export class Password extends ValueObject<PasswordProps> {
  private constructor(passwordProps: PasswordProps) {
    super(passwordProps);
  }

  getValue(): string {
    return this.props.value;
  }

  public static isValidPassword(password: string): boolean {
    return password.length >= 5;
  }

  public static create(passwordProps: PasswordProps): Result<Password> {
    const { value } = passwordProps;
    if (!this.isValidPassword(value)) {
      return Result.fail<Password>('Invalid password');
    }

    const password = new Password(passwordProps);

    return Result.ok<Password>(password);
  }
}
