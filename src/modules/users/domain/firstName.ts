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

  public static create(firstNameProps: FirstNameProps): Result<FirstName> {
    const { value } = firstNameProps;
    if (!this.isValidFirstName(value)) {
      return Result.fail<FirstName>('Invalid FirstName');
    }

    const firstName = new FirstName(firstNameProps);
    return Result.ok<FirstName>(firstName);
  }
}
