'use client';

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TodoList from '../components/TodoList';
import AddTodoForm from '../components/AddTodoForm';

export default function Home() {
  const [todos, setTodos] = useState<any[]>([]);

  useEffect(() => {
    // Fetch todos from the server when the component mounts
    const fetchTodos = async () => {
      const response = await fetch('/api/todos');
      const data = await response.json();
      setTodos(data);
    };
    fetchTodos();
  }, []);

  const handleAddTodo = async (task: string) => {
    const response = await fetch('/api/addTodo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ task }),
    });

    const newTodo = await response.json();
    setTodos([...todos, newTodo]);
  };

  const handleToggleComplete = async (id: number) => {
    const todo = todos.find((todo) => todo.id === id);
    const updatedTodo = await fetch(`/api/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        completed: !todo.completed,
      }),
    }).then((res) => res.json());

    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: updatedTodo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = async (id: number) => {
    await fetch(`/api/todos/${id}`, { method: 'DELETE' });
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-center mb-6">My To-Do List</h1>
        <AddTodoForm onAdd={handleAddTodo} />
        <TodoList
          todos={todos}
          onToggleComplete={handleToggleComplete}
          onDelete={handleDeleteTodo}
        />
      </main>
      <Footer />
    </div>
  );
}
