import { CourseModel, UserModel } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import auth from "../user/auth";

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    await auth(req,res)
    const id:string | undefined=req.body.id;
    const userId = req.headers['userId'];
    const userCheck = await UserModel.findById(userId);
    if (!userCheck) {
           return res.status(404).json({ message: 'User not found' });
         }
   const isCourse = await CourseModel.findById(id);
     if (!isCourse) {
           return res.status(404).json({ message: 'Course not found' });
         }
         const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { $pull: { cart: (id) } },
            { new: true }
          );
        
          if (updatedUser) {
            return res.json({ message: 'success'});
          } else {
            return res.status(404).json({ message: "failed to remove from cart "});
          }
          
}