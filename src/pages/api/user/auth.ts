
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { userSecretKey } from "@/pages/api/user/interface";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
 
 const token = req.cookies.token; ///

if (!token) {
    return 
  }
try {
   const user:any = jwt.verify(token, userSecretKey);
   req.headers["userId"]=user.id

} catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
}
