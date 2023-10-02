import { NextApiRequest, NextApiResponse } from "next";
import auth from "../user/auth";
import { CourseModel, UserModel } from "@/lib/db";

export default async function handler(
    req:NextApiRequest,
    res:NextApiResponse
){
   if(req.method==="POST"){
        await auth(req,res)
        const id:any=req.body.id;
        const userId = req.headers['userId'];
      const isCourse = await CourseModel.findById(id);
     if (!isCourse) {
              return res.status(404).json({ message: 'Course not found' });
            }
           const userCheck = await UserModel.findById(userId);
         if (!userCheck) {
              return res.status(404).json({ message: 'User not found' });
          }
      const indexOfCourse = userCheck.purchasedCourses.findIndex((course) => course == id);
      
            if (indexOfCourse === -1) {
              const updatedUser = await UserModel.findByIdAndUpdate(
                userId,
                { $push: { purchasedCourses: isCourse } },
                { new: true }
              );
      
              if (updatedUser) {
                return res.json({ message: 'success'});
              } else {
                return res.status(404).json({ message: "couldn't purchase "});
              }
            } else {
              return res.status(400).json({ message: 'item purchased' });
            }  
    
        }
}