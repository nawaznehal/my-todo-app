import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// Create a new Todo
export async function POST(req: Request) {
  const { task } = await req.json();

  if (!task || typeof task !== 'string') {
    return NextResponse.json({ error: 'Invalid task' }, { status: 400 });
  }

  const newTodo = await prisma.todo.create({
    data: { task },
  });

  return NextResponse.json(newTodo, { status: 201 });
}

// Update Todo (e.g., toggle complete)
export async function PUT(req: Request) {
  const { id, completed } = await req.json();

  if (!id || typeof completed !== 'boolean') {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }

  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: { completed },
  });

  return NextResponse.json(updatedTodo, { status: 200 });
}

// Delete a Todo
export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  await prisma.todo.delete({
    where: { id: parseInt(id) },
  });

  return NextResponse.json({ message: 'Todo deleted successfully' });
}
