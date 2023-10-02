import { CourseModel } from '@/lib/db'; 

import { NextApiRequest, NextApiResponse } from 'next';
import auth from '../user/auth';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method === 'GET') {
    try {
      
      const data = await CourseModel.find({ published: true });
      if (data) {
        
        return res.status(200).json({ courses: data, message: 'success' });
      } else {
        return res.status(404).json({ message: 'Course not found' });
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
