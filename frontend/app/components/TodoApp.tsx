'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import { authService } from '@/services/authService';
import { todoService } from '@/services/todoService';
import { ApiError } from '@/services/api';
import { Todo } from '@/types/todo';

export default function TodoApp() {
  const router = useRouter();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  // Auth Guard & Pemuatan Data Awal saat halaman dibuka
  useEffect(() => {
    const token = authService.getToken();
    if (!token) {
      router.replace('/login');
      return;
    }

    const loadTodos = async () => {
      try {
        setLoading(true);
        const data = await todoService.getTodos();
        const formatted: Todo[] = data.map((item) => ({
          id: item.id,
          title: item.todo,
          completed: Boolean(item.completed),
          createdAt: new Date().toISOString().split('T')[0],
        }));
        setTodos(formatted);
      } catch (err) {
        if (err instanceof ApiError && (err.status === 401 || err.status === 403)) {
          authService.logout();
          router.replace('/login');
        }
      } finally {
        setLoading(false);
      }
    };
    
    loadTodos();
  }, [router]);

  // Handler Tambah Tugas Baru (Create - POST /api/todos)
  const handleAddTodo = async (title: string) => {
    try {
      const created = await todoService.createTodo(title);
      const newTodo: Todo = {
        id: created.id,
        title: created.todo,
        completed: Boolean(created.completed),
        createdAt: new Date().toISOString().split('T')[0],
      };
      setTodos((prev) => [newTodo, ...prev]);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Terjadi kesalahan';
      alert(`Gagal menambah tugas: ${message}`);
    }
  };

  // Handler Checklist / Toggle Status Completed (Update - PUT /api/todos/:id)
  const handleToggleTodo = async (id: number | string) => {
    const target = todos.find((t) => t.id === id);
    if (!target) return;
    
    const nextCompleted = !target.completed;
    
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: nextCompleted } : t))
    );
    
    try {
      await todoService.updateTodo(id, { is_completed: nextCompleted });
    } catch (err) {
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed: !nextCompleted } : t))
      );
      alert('Gagal memperbarui status tugas');
    }
  };

  // Handler Hapus Tugas (Delete - DELETE /api/todos/:id)
  const handleDeleteTodo = async (id: number | string) => {
    try {
      await todoService.deleteTodo(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      alert('Gagal menghapus tugas');
    }
  };

  const handleLogout = () => {
    authService.logout();
    router.replace('/login');
  };

  if (loading) {
    return (
      <div className="max-w-xl mx-auto py-12 px-4 text-center">
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-gray-500">
          Memuat daftar tugas...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto py-12 px-4">
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
          <h1 className="text-2xl font-bold text-gray-800">
            Daftar Tugas (Todo List)
          </h1>
          <button
            onClick={handleLogout}
            className="text-sm px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition cursor-pointer"
          >
            Logout
          </button>
        </div>

        <TodoForm onAddTodo={handleAddTodo} />

        <div className="flex items-center justify-between mb-4 mt-6">
          <h2 className="text-sm font-semibold text-gray-700">Daftar Tugas</h2>
          <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full font-medium">
            {todos.length} item
          </span>
        </div>

        <TodoList
          todos={todos}
          onToggleTodo={handleToggleTodo}
          onDeleteTodo={handleDeleteTodo}
        />
      </div>
    </div>
  );
}