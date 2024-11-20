// /pages/api/todos/[id].ts

import prisma from '../../../lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

// Handle PUT and DELETE for a specific todo by ID
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  if (req.method === 'PUT') {
    const { completed } = req.body;

    if (completed === undefined) {
      return res.status(400).json({ error: 'Completed status is required' });
    }

    try {
      const updatedTodo = await prisma.todo.update({
        where: { id: parseInt(id) },
        data: { completed },
      });
      return res.status(200).json(updatedTodo);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update todo' });
    }
  } else if (req.method === 'DELETE') {
    try {
      await prisma.todo.delete({
        where: { id: parseInt(id) },
      });
      return res.status(204).end(); // No content, successfully deleted
    } catch (error) {
      return res.status(500).json({ error: 'Failed to delete todo' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
