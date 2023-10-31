import { NextApiRequest, NextApiResponse } from "next";
import auth from "../user/auth";
import { PrismaClient } from "@prisma/client";


const prisma=new PrismaClient()
export default async function handler(req:NextApiRequest,res:NextApiResponse){
    await auth(req,res)
    const id=Number(req.body.id);
    const userId = Number(req.headers['userId']);
    const userCheck = await prisma.user.findFirst({where:{
      id:userId
    }});
    if (!userCheck) {
           return res.status(404).json({ message: 'User not found' });
         }
         try{
   const isCourse = await prisma.courses.findFirst({where:{id}});
     if (!isCourse) {
           return res.status(404).json({ message: 'Course not found' });
         }
         const cartCourse= await prisma.cartCourses.findFirst({
          where:{
            courseId:isCourse.id,
            userId:userCheck.id
          }
        });
        if(cartCourse){
        const removeFromCart=await prisma.cartCourses.delete({
          where:{
          id:cartCourse.id,
        }})
        
          if (removeFromCart) {
            return res.json({ message: 'success'});
          } else {
            return res.status(404).json({ message: "failed to remove from cart "});
          }
        }else {
          return res.status(404).json({ message: "failed to remove from cart "});
        }
      }catch(error){
        console.log(error)
        return res.status(404).json({ message: 'Error' });
       }
     finally{
       prisma.$disconnect();
     }
          
}