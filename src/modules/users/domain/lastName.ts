import { Result } from '@shared/core/result';
import { ValueObject } from '@shared/domain/valueObject';

export interface LastNameProps {
  value: string;
}

export class LastName extends ValueObject<LastNameProps> {
  private constructor(lastNameProps: LastNameProps) {
    super(lastNameProps);
  }

  public static isValidLastName(lastName: string): boolean {
    return lastName.trim().length >= 2;
  }
  public static create(lastNameProps: LastNameProps): Result<LastName> {
    const { value } = lastNameProps;
    if (!this.isValidLastName(value)) {
      return Result.fail<LastName>('Invalid LastName');
    }

    const lastName = new LastName(lastNameProps);
    return Result.ok<LastName>(lastName);
  }
}
