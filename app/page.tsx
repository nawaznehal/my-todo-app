'use client';

import React, { useState, useEffect, lazy, Suspense } from 'react';
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

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    // Fetch todos when the component mounts
    const fetchTodos = async () => {
      try {
        const response = await fetch('/api/todos');
        if (!response.ok) {
          throw new Error('Failed to fetch todos');
        }
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredTodos = todos.filter((todo) =>
    todo.task.toLowerCase().includes(searchQuery.toLowerCase())
  );


  //user validation
  const handleAddTodo = async (task: string) => {
    if (!task.trim()) {
      console.error('Task cannot be empty');
      return;
    }

    try {
      const response = await fetch('/api/addTodo', {
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
        body: JSON.stringify({
          completed: !todo.completed,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update todo');
      }

      const updatedTodo = await response.json();
      setTodos(
        todos.map((todo) =>
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
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-900">My To-Do List</h1>
        
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full px-4 py-2 mb-4 border rounded-lg shadow-sm text-blue-500"
        />
        
        {/* Add Todo Form */}
        <AddTodoForm onAdd={handleAddTodo} />
        
        {/* Lazy Loaded Todo List */}
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
      </main>
      <Footer />
    </div>
  );
}
