import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(id:number)
{
 
  try {
   
const user = await prisma.user.findFirst({where:{ id} });
 if (user) {
      return user.email;
    } else {
        return null;
    }
  } catch (error) {
    return null;
  console.log(error)
  }finally{
    prisma.$disconnect();
  }
}
