import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
 
  try {
    const userId =Number(req.body.id);
const user = await prisma.user.findFirst({where:{ id: userId} });
 if (user) {
      res.status(200).json({ email: user.email });
    } else {
    
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }finally{
    prisma.$disconnect();
  }
}
