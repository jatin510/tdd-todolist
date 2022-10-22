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

  public static create(password: string): Result<Password> {
    if (!this.isValidPassword(password)) {
      return Result.fail<Password>('Invalid password');
    }

    const newPassword = new Password({ value: password });

    return Result.ok<Password>(newPassword);
  }
}
