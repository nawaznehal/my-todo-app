'use client';

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TodoList from '../components/TodoList';
import AddTodoForm from '../components/AddTodoForm';

type Todo = {
  id: number;
  task: string;
  completed: boolean;
};
export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

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
        // headers: { 'Content-Type': 'application/json' },
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
  
      // Check if the request was successful
      if (!response.ok) {
        throw new Error('Failed to delete todo');
      }
  
      // Remove the todo from the state only after a successful delete
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
      // Optionally, show an error message to the user here
    }
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
