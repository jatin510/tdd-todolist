import { Result } from '../../../shared/core/result';
import { ValueObject } from '../../../shared/domain/valueObject';

export interface LastNameProps {
  value: string;
}

export class LastName extends ValueObject<LastNameProps> {
  private constructor(lastNameProps: LastNameProps) {
    super(lastNameProps);
  }

  getValue(): string {
    return this.props.value;
  }

  public static isValidLastName(lastName: string): boolean {
    return lastName.trim().length >= 2;
  }
  public static create(lastName: string): Result<LastName> {
    if (!this.isValidLastName(lastName)) {
      return Result.fail<LastName>('Invalid LastName');
    }

    const newLastName = new LastName({ value: lastName });
    return Result.ok<LastName>(newLastName);
  }
}
