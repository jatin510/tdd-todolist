import { Task } from './Task';
import { Todo, TodoProps } from './todo';

describe('testing todo domain', () => {
  let task: Task;
  test('creating task value object', () => {
    const taskOrError = Task.create('first Task');

    expect(taskOrError.isSuccess).toBeTruthy();
    task = taskOrError.getValue();
  });

  test('todo domain is successfully created', () => {
    const todoProps: TodoProps = {
      task,
    };

    const todoOrError = Todo.create(todoProps);

    expect(todoOrError.isSuccess).toBeTruthy();
    const todo = todoOrError.getValue();
    expect(todo.task).toEqual(todoProps.task);
    expect(todo.isCompleted).toEqual(false);
  });
});
