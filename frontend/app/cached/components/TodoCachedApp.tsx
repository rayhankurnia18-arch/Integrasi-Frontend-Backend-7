'use client';

import React from 'react';
import { Todo } from '@/lib/todos';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import TodoForm from '@/app/components/TodoForm';
import TodoList from '@/app/components/TodoList';

type TodoCachedAppProps = {
  initialTodos: Todo[];
};

export default function TodoCachedApp({ initialTodos }: TodoCachedAppProps) {
  const [todos, setTodos] = useLocalStorage<Todo[]>('TODO_LIST_CACHE', initialTodos);

  const handleAddTodo = (title: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      title,
      completed: false,
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const handleToggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleReset = () => {
    setTodos(initialTodos);
  };

  return (
    <div className="max-w-xl mx-auto py-12 px-4">
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6 pb-4 border-b border-gray-100">
          Daftar Tugas (Todo List)
        </h1>

        <TodoForm onAddTodo={handleAddTodo} />

        {/* Indikator LocalStorage & Tombol Reset */}
        <div className="flex items-center justify-between text-xs text-emerald-600 font-medium my-3 px-1">
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block"></span>
            Utama dari LocalStorage (TODO_LIST_CACHE)
          </span>
          <button
            onClick={handleReset}
            className="text-gray-400 hover:text-gray-600 underline"
          >
            Reset ke Data Awal
          </button>
        </div>

        <div className="flex items-center justify-between mb-4 mt-4">
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