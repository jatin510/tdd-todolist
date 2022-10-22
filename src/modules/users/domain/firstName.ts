import { Result } from '@shared/core/result';
import { ValueObject } from '@shared/domain/valueObject';

export interface FirstNameProps {
  value: string;
}

export class FirstName extends ValueObject<FirstNameProps> {
  private constructor(firstNameProps: FirstNameProps) {
    super(firstNameProps);
  }

  getValue(): string {
    return this.props.value;
  }

  public static isValidFirstName(firstName: string): boolean {
    return firstName.trim().length >= 2;
  }

  public static create(firstName: string): Result<FirstName> {
    if (!this.isValidFirstName(firstName)) {
      return Result.fail<FirstName>('Invalid FirstName');
    }

    const newFirstName = new FirstName({ value: firstName });
    return Result.ok<FirstName>(newFirstName);
  }
}
