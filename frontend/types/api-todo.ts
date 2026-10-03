export type DummyJsonTodo = {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
};

export type DummyJsonResponse = {
  todos: DummyJsonTodo[];
  total: number;
  skip: number;
  limit: number;
};

export type FormattedTask = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  source: string;
};

export type ApiTodo = DummyJsonTodo;
export type TodosApiResponse = DummyJsonResponse;