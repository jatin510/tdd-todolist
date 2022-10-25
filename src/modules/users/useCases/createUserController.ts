import express from 'express';
import { BaseController } from '../../../shared/infra/http/models/baseController';
import { CreateUserUseCase } from './createUser/createUser';
import { CreateUserDTO } from './createUser/createUserDto';

export class CreateUserController extends BaseController {
  private useCase: CreateUserUseCase;

  constructor(useCase: CreateUserUseCase) {
    super();
    this.useCase = useCase;
  }
  protected async executeImpl(
    req: express.Request,
    res: express.Response
  ): Promise<any> {
    let body = req.body;

    // Check to see if firstname, lastname, password, email is in the request
    const isFirstNamePresent = body.firstName;
    const isLastNamePresent = body.lastName;
    const isEmailPresent = body.email;
    const isPasswordPresent = body.password;

    // If not, end the request
    if (
      !isFirstNamePresent ||
      !isEmailPresent ||
      !isLastNamePresent ||
      !isPasswordPresent
    ) {
      return res.status(400).json({
        message: `Either 'firstName', 'lastName', 'email' or 'password not present`,
      });
    }

    let dto: CreateUserDTO = req.body as CreateUserDTO;

    dto = {
      email: dto.email,
      password: dto.password,
      firstName: dto.firstName,
      lastName: dto.lastName,
    };

    try {
      const result = await this.useCase.execute(dto);

      switch (result.type) {
        case 'CreateUserSuccess':
          return res.status(201).json(result);
        case 'AlreadyRegisteredError':
          return res.status(409).json(result);
        case 'InvalidUserDetailsError':
          return res.status(400).json(result);
        case 'UnexpectedError':
          return res.status(500).json(result);
      }
    } catch (err) {
      return this.fail(res, err);
    }
  }
}
