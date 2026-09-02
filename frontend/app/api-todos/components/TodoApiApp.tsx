'use client';

import React, { useState } from 'react';
import { FormattedTask } from '@/types/api-todo';
import TodoApiItem from './TodoApiItem';

type TodoApiAppProps = {
  initialTasks: FormattedTask[];
};

export default function TodoApiApp({ initialTasks }: TodoApiAppProps) {
  const [tasks, setTasks] = useState<FormattedTask[]>(initialTasks);

  const handleToggle = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="max-w-xl mx-auto py-12 px-4">
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6 pb-4 border-b border-gray-100">
          Daftar Tugas (Todo List)
        </h1>

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-700">Daftar Tugas</h2>
          <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full font-medium">
            {tasks.length} item
          </span>
        </div>

        <div className="space-y-3">
          {tasks.map((task) => (
            <TodoApiItem key={task.id} todo={task} onToggle={handleToggle} />
          ))}
        </div>
      </div>
    </div>
  );
}