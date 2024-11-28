// pages/api/todos/[id].ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query; // Extract todo id from the query parameters

  // Ensure the id is a valid number
  if (typeof id !== 'string' || isNaN(Number(id))) {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  // Handling PUT request to update a todo item
  if (req.method === 'PUT') {
    try {
      const { completed } = req.body; // Get the completed status from the request body

      // Check if the completed field is a boolean
      if (typeof completed !== 'boolean') {
        return res.status(400).json({ error: 'Completed field must be a boolean' });
      }

      // Update the todo item in the database
      const updatedTodo = await prisma.todo.update({
        where: { id: Number(id) },
        data: { completed },
      });

      return res.status(200).json(updatedTodo); // Respond with the updated todo

    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to update todo' }); // Handle server errors
    }
  }

  // Handling DELETE request to delete a todo item
  if (req.method === 'DELETE') {
    try {
      // Delete the todo item from the database
      await prisma.todo.delete({
        where: { id: Number(id) },
      });

      return res.status(204).end(); // Return No Content status (successful deletion)

    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to delete todo' }); // Handle server errors
    }
  }

  // If the method is neither PUT nor DELETE, return Method Not Allowed status
  return res.status(405).json({ error: 'Method Not Allowed' });
}
