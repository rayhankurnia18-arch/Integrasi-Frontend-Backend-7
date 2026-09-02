import { fetchDummyTodos } from '@/services/todoService';
import { FormattedTask } from '@/types/api-todo';

export async function getTasks() {
  const dummyData = await fetchDummyTodos();

  const formattedTasks: FormattedTask[] = dummyData.todos.map((item) => ({
    id: item.id,
    title: item.todo,
    completed: item.completed,
    userId: item.userId,
    source: 'dummyjson-api',
  }));

  return {
    success: true,
    message: 'Koneksi ke DummyJSON API berhasil! Data berhasil diambil.',
    count: formattedTasks.length,
    total: dummyData.total,
    data: {
      tasks: formattedTasks,
    },
  };
}