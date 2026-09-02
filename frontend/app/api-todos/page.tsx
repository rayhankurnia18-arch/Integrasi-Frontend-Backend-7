import { getTasks } from '@/lib/tasks';
import TodoApiApp from './components/TodoApiApp';

export default async function ApiTodosPage() {
  const result = await getTasks();

  return (
    <main className="min-h-screen bg-gray-50">
      <TodoApiApp initialTasks={result.data.tasks} />
    </main>
  );
}