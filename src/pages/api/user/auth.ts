
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { env } from "process";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
 const token = req.cookies.token;
if (!token) {
  return 

  }
try {

  const userSecretKey =process.env.secretKey;
  if (!userSecretKey) {
    return res.status(500).json({ message: "Server configuration error" });
  }
   const user:string|jwt.JwtPayload = jwt.verify(token, userSecretKey);
   if(typeof user!="string"){
   req.headers["userId"]=user.id
   }
   
} catch (error) {
  console.log(error)
    return res.status(403).json({ message: "Invalid token" });
  }
}


