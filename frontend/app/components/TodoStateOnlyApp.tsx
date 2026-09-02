'use client';

import React, { useState } from 'react';
import { Todo } from '@/lib/todos';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

type TodoStateOnlyAppProps = {
  initialTodos: Todo[];
};

export default function TodoStateOnlyApp({ initialTodos }: TodoStateOnlyAppProps) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

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

  return (
    <div className="max-w-xl mx-auto py-12 px-4">
      {/* Outer Card Container */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6 pb-4 border-b border-gray-100">
          Daftar Tugas (Todo List)
        </h1>

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