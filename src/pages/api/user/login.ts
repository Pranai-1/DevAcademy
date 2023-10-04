import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import {config} from "dotenv"

import { UserModel } from "@/lib/db"; 
import jwt from 'jsonwebtoken';
import { user } from "./interface";


const userInput = z.object({
  email: z.string().min(10).max(40).email(),
  password: z.string().min(5).max(40),
});

type Data = {
  message: string;
  email?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  config()
  const body = await req.body;
  const parsedInput = userInput.safeParse(body);
  if (!parsedInput.success) {
    return res.status(404).json({ message: "failed" });
  }
  const email = parsedInput.data.email;
  const password = parsedInput.data.password;
  const user: user | null = await UserModel.findOne({ email,password });
 
  if (user) {
    const userSecretKey = "secrectfornewudev-academysers12345";
  
  if (!userSecretKey) {
    return res.status(500).json({ message: "Server configuration error" });
  }
    let userToken = jwt.sign({ id: user._id }, userSecretKey, { expiresIn: '1d' });
    res.setHeader("Set-Cookie", `token=${userToken}; HttpOnly; Secure; SameSite=Strict; Path=/`);
    const cookies = req.headers.cookie || ""; //this is one of the way to get the cookie
 
    const emailParts = user.email.split('@');
      const trimmedEmail = emailParts[0];
    return res.status(200).json({ message: "success",email:trimmedEmail});
  } else {
    res.status(400).json({ message: 'failed' });
  }
}
