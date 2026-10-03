'use client';

import React from 'react';
import { Todo } from '@/types/todo';
import TodoItem from './TodoItem';

type TodoListProps = {
  todos: Todo[];
  onToggleTodo: (id: number | string) => void;
  onDeleteTodo: (id: number | string) => void;
};

export default function TodoList({
  todos,
  onToggleTodo,
  onDeleteTodo,
}: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        Belum ada tugas. Tambahkan tugas baru di atas!
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggleTodo}
          onDelete={onDeleteTodo}
        />
      ))}
    </div>
  );
}