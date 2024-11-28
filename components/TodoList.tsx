'use client';

import React, { useState } from 'react';

type Todo = {
  id: number;
  task: string;
  completed: boolean;
};

type Props = {
  todos: Todo[];
};

export default function TodoList({ todos }: Props) {
  const [currentTodos, setCurrentTodos] = useState(todos);

  const handleToggleComplete = async (id: number) => {
    // Toggle the completion status of the todo
    await fetch(`/api/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        completed: !currentTodos.find((todo) => todo.id === id)?.completed,
      }),
    });

    // Update the state with the new completion status
    setCurrentTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDelete = async (id: number) => {
    // Delete the todo item
    await fetch(`/api/todos/${id}`, { method: 'DELETE' });

    // Remove the deleted todo from the state
    setCurrentTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <ul className="space-y-4">
      {currentTodos.map((todo) => (
        <li
          key={todo.id}
          className={`flex items-center justify-between p-4 bg-white rounded-lg shadow ${
            todo.completed ? 'line-through text-gray-400' : ''
          }`}
        >
          <span>{todo.task}</span>
          <div>
            <button
              onClick={() => handleToggleComplete(todo.id)}
              className="mr-2 px-3 py-1 text-sm bg-green-500 text-white rounded-lg"
            >
              {todo.completed ? 'Undo' : 'Complete'}
            </button>
            <button
              onClick={() => handleDelete(todo.id)}
              className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
