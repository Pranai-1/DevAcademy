import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client';
import auth from "./auth";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
 
  try {
    await auth(req,res)
   const id = Number(req.headers["userId"]);
const user = await prisma.user.findFirst({where:{ id} });
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
