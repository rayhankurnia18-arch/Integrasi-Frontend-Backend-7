'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getTodoDetail } from '@/lib/todos';
import TaskNotFound from './components/TaskNotFound';
import TaskDetailCard from './components/TaskDetailCard';
import { Todo } from '@/types/todo';

export default function TodoDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const [todo, setTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchTodo = () => {
      getTodoDetail(id)
        .then((data) => {
          setTodo(data);
        })
        .catch(() => {
          setTodo(null);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    // Panggil saat pertama kali mount atau ID berubah
    fetchTodo();

    // Listener untuk sinkronisasi state saat navigasi cached dari Next.js
    const handleUpdate = () => {
      fetchTodo();
    };

    window.addEventListener('todos_updated', handleUpdate);
    return () => {
      window.removeEventListener('todos_updated', handleUpdate);
    };
  }, [id, router]);

  if (loading) {
    return (
      <main className="min-h-screen p-8 bg-gray-100 flex items-center justify-center">
        <div className="text-gray-500">Memuat detail tugas...</div>
      </main>
    );
  }

  if (!todo) {
    return <TaskNotFound id={id} />;
  }

  return <TaskDetailCard todo={todo} />;
}