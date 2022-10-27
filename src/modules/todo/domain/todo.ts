import { Guard } from '../../../shared/core/guard';
import { Result } from '../../../shared/core/result';
import { Entity } from '../../../shared/domain/entity';
import { Task } from './task';

export interface TodoProps {
  task: Task;
  isCompleted?: boolean;
  createdAt?: Date;
}

export class Todo extends Entity<TodoProps> {
  private constructor(todoProps: TodoProps) {
    super(todoProps);
  }

  get task() {
    return this.props.task;
  }

  get isCompleted(): boolean {
    return this.props.isCompleted;
  }

  public static create(todoProps: TodoProps) {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: todoProps.task, argumentName: 'task' },
    ]);

    if (guardResult.isFailure) {
      return Result.fail<Todo>(guardResult.getErrorValue());
    }

    todoProps = {
      ...todoProps,
      isCompleted: todoProps.isCompleted ?? false,
      createdAt: todoProps.createdAt ?? new Date(),
    };

    const todo = new Todo(todoProps);

    return Result.ok<Todo>(todo);
  }
}
