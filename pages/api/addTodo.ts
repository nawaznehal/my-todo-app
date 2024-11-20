// /pages/api/addTodo.ts

import prisma from '../../lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { task } = req.body;

    if (!task) {
      return res.status(400).json({ error: 'Task is required' });
    }

    try {
      const newTodo = await prisma.todo.create({ data: { task, completed: false } });
      res.status(201).json(newTodo);
    } catch (error) {
      res.status(500).json({ error: 'Failed to add todo' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
