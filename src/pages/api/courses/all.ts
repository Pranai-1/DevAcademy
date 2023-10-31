
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma=new PrismaClient()
export default async function GET(req: NextApiRequest, res: NextApiResponse) {
    try {
      const data = await prisma.courses.findMany({where:{published: true} });
      if (data) {
        return res.status(200).json({ courses: data, message: 'success' });
      } else {
        return res.status(404).json({ message: 'Course not found' });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }finally{
      prisma.$disconnect();
    }
  
  
}
