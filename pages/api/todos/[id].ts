import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  // Validate ID
  const todoId = parseInt(id as string, 10);
  if (isNaN(todoId)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  if (req.method === 'PUT') {
    try {
      const { completed } = JSON.parse(req.body); // Parse JSON body
      if (typeof completed !== 'boolean') {
        return res.status(400).json({ error: 'Completed must be a boolean' });
      }

      // Update the todo
      const updatedTodo = await prisma.todo.update({
        where: { id: todoId },
        data: { completed },
      });

      return res.status(200).json(updatedTodo);
    } catch (error) {
      console.error('Error updating todo:', error);
      return res.status(500).json({ error: 'Failed to update todo' });
    }
  } else if (req.method === 'DELETE') {
    try {
      // Delete the todo
      await prisma.todo.delete({
        where: { id: todoId },
      });

      return res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (error) {
      console.error('Error deleting todo:', error);
      return res.status(500).json({ error: 'Failed to delete todo' });
    }
  } else {
    // If method is not allowed
    res.setHeader('Allow', ['PUT', 'DELETE']);
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
