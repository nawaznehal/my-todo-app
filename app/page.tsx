import React, { Suspense } from 'react';
import { PrismaClient } from '@prisma/client';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Lazy load TodoList and AddTodoForm components
const TodoList = React.lazy(() => import('../components/TodoList'));
const AddTodoForm = React.lazy(() => import('../components/AddTodoForm'));

const prisma = new PrismaClient();

// Fetch todos from the database (Server Component)
async function fetchTodos() {
  return await prisma.todo.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export default async function Home() {
  const todos = await fetchTodos();

  

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-900">My To-Do List</h1>

        {/* Suspense to handle lazy loading */}
        <Suspense fallback={<div>Loading...</div>}>
          {/* Add Todo Form */}
          <AddTodoForm />

          {/* Todo List */}
          <TodoList todos={todos} />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
