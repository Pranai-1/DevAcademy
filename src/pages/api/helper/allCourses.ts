
import { PrismaClient } from '@prisma/client';

const prisma=new PrismaClient()
export default async function allCourses() {
    try {
      const data = await prisma.courses.findMany({where:{published: true} });
      if (data) {
        console.log(data)
       return data;
      } else {
       
        return [];
      }
    } catch (error) {
      console.log(error);
        return [];

    }finally{
      prisma.$disconnect();
    }  
}
