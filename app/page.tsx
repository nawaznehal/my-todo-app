"use client"

import React, { lazy, Suspense } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AddTodoForm from '../components/AddTodoForm';

// Lazy load TodoList with a fallback UI
const TodoList = lazy(() => import('../components/TodoList'));

type Todo = {
  id: number;
  task: string;
  completed: boolean;
};

// Client Component for interactive functionality
function ClientTodoComponent({ initialTodos }: { initialTodos: Todo[] }) {
  const [todos, setTodos] = React.useState<Todo[]>(initialTodos);
  const [searchQuery, setSearchQuery] = React.useState<string>('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredTodos = todos.filter((todo) =>
    todo.task.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddTodo = async (task: string) => {
    if (!task.trim()) {
      console.error('Task cannot be empty');
      return;
    }

    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task }),
      });

      if (!response.ok) {
        throw new Error('Failed to add todo');
      }

      const newTodo = await response.json();
      setTodos([...todos, newTodo]);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleToggleComplete = async (id: number) => {
    const todo = todos.find((todo) => todo.id === id);
    if (!todo) return;

    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          completed: !todo.completed, // Toggle the completion status
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update todo');
      }

      const updatedTodo = await response.json();

      // Update the local state with the new todo
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, completed: updatedTodo.completed } : todo
        )
      );
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      const response = await fetch(`/api/todos/${id}`, { method: 'DELETE' });

      if (!response.ok) {
        throw new Error('Failed to delete todo');
      }

      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <>
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="w-full px-4 py-2 mb-4 border rounded-lg shadow-sm text-blue-500"
      />
      <AddTodoForm onAdd={handleAddTodo} />
      <Suspense
        fallback={
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            <span className="ml-2 text-gray-600">Loading To-Do List...</span>
          </div>
        }
      >
        <TodoList
          todos={filteredTodos}
          onToggleComplete={handleToggleComplete}
          onDelete={handleDeleteTodo}
        />
      </Suspense>
    </>
  );
}

// Server Component to fetch data
async function fetchTodos(): Promise<Todo[]> {
  try {
    const response = await fetch(`${process.env.DATABASE_URL}/api/todos`, {
      cache: 'no-store',
    });
    

    if (!response.ok) {
      throw new Error('Failed to fetch todos');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching todos on server:', error);
    return [];
  }
}

// Main Page Component
export default async function Home() {
  const todos = await fetchTodos();

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-900">My To-Do List</h1>
        {/* Search and Add Todo */}
        <ClientTodoComponent initialTodos={todos} />
      </main>
      <Footer />
    </div>
  );
}
