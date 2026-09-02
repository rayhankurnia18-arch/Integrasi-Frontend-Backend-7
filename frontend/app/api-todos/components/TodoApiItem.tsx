'use client';

import React from 'react';
import { FormattedTask } from '@/types/api-todo';

type TodoApiItemProps = {
  todo: FormattedTask;
  onToggle: (id: number) => void;
};

export default function TodoApiItem({ todo, onToggle }: TodoApiItemProps) {
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

      {/* Badge ID, User ID, dan Status */}
      <div className="flex items-center gap-2">
        <span className="text-[10px] bg-purple-100 text-purple-700 font-bold px-2 py-0.5 rounded">
          ID: {todo.id}
        </span>
        <span className="text-[10px] bg-sky-100 text-sky-700 font-bold px-2 py-0.5 rounded">
          User: {todo.userId}
        </span>
        <span
          className={`text-[10px] font-bold px-2 py-0.5 rounded ${
            todo.completed
              ? 'bg-emerald-100 text-emerald-700'
              : 'bg-amber-100 text-amber-700'
          }`}
        >
          {todo.completed ? 'Selesai' : 'Pending'}
        </span>
      </div>
    </div>
  );
}