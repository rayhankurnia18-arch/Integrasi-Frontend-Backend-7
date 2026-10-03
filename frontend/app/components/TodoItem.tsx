'use client';

import React from 'react';
import Link from 'next/link';
import { Todo } from '@/types/todo';
import { Button } from '@/app/components/ui/button';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: number | string) => void;
  onDelete: (id: number | string) => void;
};

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 shadow-sm transition-all hover:border-gray-200">
      <div className="flex items-center gap-3 flex-1">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="h-5 w-5 rounded border-gray-300 text-cmlabs-primary focus:ring-cmlabs-primary cursor-pointer"
        />
        <span
          className={`text-sm ${
            todo.completed ? 'line-through text-gray-400' : 'text-gray-700'
          }`}
        >
          {todo.title}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Link href={`/task/${todo.id}`}>
          <Button variant="outline" size="sm" className="bg-sky-100 text-sky-600 hover:bg-sky-200 border-none text-xs font-semibold px-3 py-1 rounded-md">
            Detail &rarr;
          </Button>
        </Link>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDelete(todo.id)}
          className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded-md"
        >
          Hapus
        </Button>
      </div>
    </div>
  );
}