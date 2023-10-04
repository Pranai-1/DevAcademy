import { CourseModel, ensureDbConnected } from '@/lib/db'; 

import { NextApiRequest, NextApiResponse } from 'next';



export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  await ensureDbConnected();
 
    try {
      
      const data = await CourseModel.find({ published: true });
      if (data) {
        
        return res.status(200).json({ courses: data, message: 'success' });
      } else {
        return res.status(404).json({ message: 'Course not found' });
      }
    } catch (error) {

      return res.status(500).json({ message: 'Internal server error' });
    }
  
}
