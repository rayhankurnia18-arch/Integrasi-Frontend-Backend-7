import { DummyJsonResponse } from '@/types/api-todo';

export async function fetchDummyTodos(): Promise<DummyJsonResponse> {
  const res = await fetch('https://dummyjson.com/todos?limit=10', {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Gagal mengambil data dari DummyJSON API');
  }

  return res.json();
}