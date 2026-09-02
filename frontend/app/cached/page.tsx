import { getTodos } from '@/lib/todos';
import TodoCachedApp from './components/TodoCachedApp';

export default async function CachedPage() {
  const initialTodos = await getTodos();

  return (
    <main className="min-h-screen bg-gray-50">
      <TodoCachedApp initialTodos={initialTodos} />
    </main>
  );
}