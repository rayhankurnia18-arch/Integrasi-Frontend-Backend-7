export type Todo = {
  id: number | string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
};