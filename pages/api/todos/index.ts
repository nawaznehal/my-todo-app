import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const todos = await prisma.todo.findMany();
      res.status(200).json(todos);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch todos' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
