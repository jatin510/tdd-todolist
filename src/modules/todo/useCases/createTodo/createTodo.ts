import { Result } from '../../../../shared/core/result';
import { UseCase } from '../../../../shared/core/useCase';
import { Task } from '../../domain/task';
import { Todo } from '../../domain/todo';
import { CreateTodoDto } from './createTodo.dto';

export type CreateTodoSuccess = {
  type: 'CreateTodoSuccess';
};

export type InvalidTodoDetailsError = {
  type: 'InvalidTodoDetailsError';
  message: string;
};

export type UnexpectedError = {
  type: 'UnexpectedError';
};

export type CreateTodoResult =
  | InvalidTodoDetailsError
  | UnexpectedError
  | CreateTodoSuccess;

export class CreateTodoUseCase
  implements UseCase<CreateTodoDto, Promise<CreateTodoResult>>
{
  constructor() {}

  public async execute(request: CreateTodoDto): Promise<CreateTodoResult> {
    // validation logic
    const taskOrError = Task.create(request.task);

    const combinedResult = Result.combine([taskOrError]);

    if (combinedResult.isFailure) {
      return {
        type: 'InvalidTodoDetailsError',
        message: combinedResult.getErrorValue(),
      };
    }

    // create a todo
    let todoOrError = Todo.create({
      task: taskOrError.getValue() as Task,
    });

    if (todoOrError.isFailure) {
      return {
        type: 'InvalidTodoDetailsError',
        message: combinedResult.getErrorValue(),
      };
    }

    let todo = todoOrError.getValue();

    return { type: 'CreateTodoSuccess' };
  }
}
