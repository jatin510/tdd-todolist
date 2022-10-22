import { Result } from '@shared/core/result';
import { ValueObject } from '@shared/domain/valueObject';

export interface EmailProps {
  value: string;
}

export class Email extends ValueObject<EmailProps> {
  private constructor(emailProps: EmailProps) {
    super(emailProps);
  }

  getValue(): string {
    return this.props.value;
  }

  public static isValidEmail(email: string): boolean {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  public static create(email: string): Result<Email> {
    if (!this.isValidEmail(email)) {
      return Result.fail<Email>('Invalid email');
    }

    const newEmail = new Email({ value: email });
    return Result.ok<Email>(newEmail);
  }
}
