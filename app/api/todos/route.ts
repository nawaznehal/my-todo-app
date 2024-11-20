// /app/api/todos/route.ts

import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function GET() {
  try {
    const todos = await prisma.todo.findMany();
    console.log('Fetched todos:', todos); // Log the todos
    return NextResponse.json(todos);
} catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message); // Log the error message
    }
    return NextResponse.json({ error: 'Failed to fetch todos' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const { task } = await req.json();

  if (!task) {
    return NextResponse.json({ error: 'Task is required' }, { status: 400 });
  }

  try {
    const newTodo = await prisma.todo.create({ data: { task, completed: false } });
    console.log('Created todo:', newTodo);
    return NextResponse.json(newTodo, { status: 201 });
} catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message); // Log the error message
    }
    return NextResponse.json({ error: 'Failed to add todo' }, { status: 500 });
  }
}
