import { apiClient } from './api';
import { ApiTodo, TodosApiResponse as DummyJsonTodosResponse } from '@/types/api-todo';

export interface BackendTodo {
  id: number;
  todo: string;
  completed: boolean;
}

export interface TodosResponse {
  success: boolean;
  message: string;
  data: BackendTodo[];
}

export interface SingleTodoResponse {
  success: boolean;
  message: string;
  data: BackendTodo;
}

export interface FetchTodosParams {
  limit?: number;
  skip?: number;
}

export interface CreateTodoInput {
  todo: string;
  completed?: boolean;
  userId?: number;
}

export async function fetchDummyTodos(
  params: FetchTodosParams = { limit: 10, skip: 0 }
): Promise<DummyJsonTodosResponse> {
  const limit = params.limit ?? 10;
  const skip = params.skip ?? 0;
  const res = await fetch(`https://dummyjson.com/todos?limit=${limit}&skip=${skip}`);
  if (!res.ok) {
    throw new Error('Gagal mengambil data dari DummyJSON');
  }
  return res.json();
}

export const todoService = {
  async getTodos(): Promise<BackendTodo[]> {
    const res = await apiClient<TodosResponse>('/todos');
    return res.data || [];
  },

  async getTodoById(id: number | string): Promise<BackendTodo> {
    const res = await apiClient<SingleTodoResponse>(`/todos/${id}`);
    return res.data;
  },

  async createTodo(payload: string | CreateTodoInput): Promise<BackendTodo> {
    const task = typeof payload === 'string' ? payload : payload.todo;
    const res = await apiClient<SingleTodoResponse>('/todos', {
      method: 'POST',
      body: JSON.stringify({ task }),
    });
    return res.data;
  },

  async updateTodo(
    id: number | string,
    payload: { task?: string; is_completed?: boolean }
  ): Promise<void> {
    await apiClient(`/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  },

  async deleteTodo(id: number | string): Promise<void> {
    await apiClient(`/todos/${id}`, {
      method: 'DELETE',
    });
  },

  async fetchTodos(params: FetchTodosParams = { limit: 10, skip: 0 }): Promise<DummyJsonTodosResponse> {
    return fetchDummyTodos(params);
  }
};