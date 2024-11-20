import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Fetch all todos
export async function getTodos() {
  return await prisma.todo.findMany();
}

// Add a new todo
export async function addTodo(task: string) {
  return await prisma.todo.create({
    data: { task, completed: false },
  });
}

// Update a todo
export async function updateTodo(id: number, completed: boolean) {
  return await prisma.todo.update({
    where: { id },
    data: { completed },
  });
}

// Delete a todo
export async function deleteTodo(id: number) {
  return await prisma.todo.delete({
    where: { id },
  });
}
export default prisma;

