// /app/api/todos/route.ts

import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function GET() {
  try {
    const todos = await prisma.todo.findMany();
    return NextResponse.json(todos);
  } catch (error) {
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
    return NextResponse.json(newTodo, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add todo' }, { status: 500 });
  }
}
