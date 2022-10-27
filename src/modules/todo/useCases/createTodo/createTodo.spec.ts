import { CreateTodoDto } from './createTodo.dto';
import { CreateTodoUseCase } from './createTodo';

describe('Testing create todo UseCase', () => {
  test('should throw a error', async () => {
    const createTodoDto: CreateTodoDto = {
      task: '',
    };

    const createTodoUseCase = new CreateTodoUseCase();
    const result = await createTodoUseCase.execute(createTodoDto);
    expect(result.type).toEqual('InvalidTodoDetailsError');
  });
  test('create a new todo ', async () => {
    const createTodoDto: CreateTodoDto = {
      task: 'First todo',
    };

    const createTodoUseCase = new CreateTodoUseCase();
    const result = await createTodoUseCase.execute(createTodoDto);
    expect(result.type).toEqual('CreateTodoSuccess');
  });
});
