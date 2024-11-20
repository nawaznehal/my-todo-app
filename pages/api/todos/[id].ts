// Example API route handler (pages/api/todos/[id].ts)
import prisma from '../../../lib/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    const { completed } = req.body;
    if (typeof completed !== 'boolean') {
      return res.status(400).json({ error: 'Completed must be a boolean' });
    }

    try {
      const updatedTodo = await prisma.todo.update({
        where: { id: Number(id) },
        data: { completed },
      });
      res.status(200).json(updatedTodo);
    } catch (error) {
      console.error('Error updating todo:', error);
      res.status(500).json({ error: 'Failed to update todo' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
