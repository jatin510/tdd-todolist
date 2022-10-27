import { Result } from '../../../shared/core/result';
import { ValueObject } from '../../../shared/domain/valueObject';

export interface TaskProps {
  value: string;
}

export class Task extends ValueObject<TaskProps> {
  private constructor(taskProps: TaskProps) {
    super(taskProps);
  }

  get value(): string {
    return this.props.value;
  }

  static isValidTask(task: string): boolean {
    return task.trim().length > 5;
  }

  public static create(task: string): Result<Task> {
    if (!this.isValidTask(task)) {
      return Result.fail<Task>('Invalid task');
    }

    const newTask = new Task({ value: task });
    return Result.ok<Task>(newTask);
  }
}
