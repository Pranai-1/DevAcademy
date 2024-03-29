import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import {config} from "dotenv"
import jwt from 'jsonwebtoken';
import { PrismaClient } from "@prisma/client";

const prisma=new PrismaClient()

const userInput = z.object({
  email: z.string().min(10).max(40).email(),
  password: z.string().min(6).max(40),
});

type Data = {
  message: string;
  email?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const body = await req.body;
  const parsedInput = userInput.safeParse(body);
  if (!parsedInput.success) {
    return res.status(404).json({ message: "failed" });
  }
  const email = parsedInput.data.email;
  const password = parsedInput.data.password;
  try{
  const user= await prisma.user.findFirst({where:{email,password} });
 
  if (user) {
  
    const userSecretKey =process.env.secretKey;
  
  if (!userSecretKey) {
    return res.status(500).json({ message: "Server configuration error" });
  }
    let userToken = jwt.sign({ id: user.id }, userSecretKey, { expiresIn: '1d' });
    res.setHeader("Set-Cookie", `token=${userToken}; HttpOnly; Secure; SameSite=Strict; Path=/`);
    const cookies = req.headers.cookie || ""; //this is one of the way to get the cookie
    const emailParts = user.email.split('@');
      const trimmedEmail = emailParts[0];
    return res.status(200).json({ message: "success",email:trimmedEmail});
  } else {
    res.status(400).json({ message: 'failed' });
  }
} catch (error) {
  res.status(500).json({ message: "Internal server error" });
}finally{
  prisma.$disconnect();
}
}
