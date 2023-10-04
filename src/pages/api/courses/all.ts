import { CourseModel } from '@/lib/db';
import { NextApiRequest, NextApiResponse } from 'next';
import cors from 'cors'; // Import the cors middleware
import { error } from 'console';

// Initialize the cors middleware
const corsMiddleware = cors();

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Apply the cors middleware to your route handler
    corsMiddleware(req, res,error);

    const data = await CourseModel.find({ published: true });
    if (data) {
      return res.status(200).json({ courses: data, ok: true });
    } else {
      return res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}
