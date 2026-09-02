import { getTodos } from '@/lib/todos';
import TodoStateOnlyApp from './components/TodoStateOnlyApp';

export default async function HomePage() {
  const initialTodos = await getTodos();

  return (
    <main className="min-h-screen bg-gray-50">
      <TodoStateOnlyApp initialTodos={initialTodos} />
    </main>
  );
}