import { NextApiRequest, NextApiResponse } from "next";
import auth from "../user/auth";
import { CourseModel, UserModel } from "@/lib/db";
import { course } from "../user/interface";

export default async function handler(
    req:NextApiRequest,
    res:NextApiResponse
){
   if(req.method==="POST"){
        await auth(req,res)
       const id:string | undefined=req.body.id;
       const userId = req.headers['userId'] as string ;
      const isCourse = await CourseModel.findById(id);
        if (!isCourse) {
              return res.status(404).json({ message: 'Course not found' });
            }
       const userCheck = await UserModel.findById(userId);
       if (!userCheck) {
              return res.status(404).json({ message: 'User not found' });
            }
      const indexOfCourse = userCheck.cart.findIndex((obj) =>obj == id);
    if (indexOfCourse === -1) {
              const updatedUser = await UserModel.findByIdAndUpdate(
                userId,
                { $push: { cart: isCourse } },
                { new: true }
              );
      
              if (updatedUser) {
                return res.json({ message: 'success'});
              } else {
                return res.status(404).json({ message: "couldn't add to cart "});
              }
            } else {
              return res.status(400).json({ message: 'item present in cart' });
            }  
    
        }
}