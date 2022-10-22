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

  public static create(emailProps: EmailProps): Result<Email> {
    const { value } = emailProps;
    if (!this.isValidEmail(value)) {
      return Result.fail<Email>('Invalid email');
    }

    const email = new Email(emailProps);
    return Result.ok<Email>(email);
  }
}
