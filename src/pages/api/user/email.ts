import { NextApiRequest, NextApiResponse } from "next";
import {UserModel} from "@/lib/db"; 
import auth from "@/pages/api/user/auth"
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
   
    const userId = req.body.id;
const user = await UserModel.findOne({ _id: userId });
 if (user) {
      res.status(200).json({ email: user.email });
    } else {
    
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}
