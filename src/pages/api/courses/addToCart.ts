import { NextApiRequest, NextApiResponse } from "next";
import auth from "../user/auth";
import { PrismaClient } from "@prisma/client";


const prisma=new PrismaClient()
export default async function POST(
    req:NextApiRequest,
    res:NextApiResponse
){
        await auth(req,res)
       const id=Number(req.body.id);
       const userId = Number(req.headers['userId']);
       try{
      const isCourse = await prisma.courses.findFirst({where:{id}});
        if (!isCourse) {
              return res.status(404).json({ message: 'Course not found' });
            }
       const userCheck = await prisma.user.findFirst({where:{id:userId}});
       if (!userCheck) {
              return res.status(404).json({ message: 'User not found' });
            }
      const indexOfCourse = await prisma.cartCourses.findFirst({
        where:{
          courseId:isCourse.id,
          userId:userCheck.id
        }
      })
    if (!indexOfCourse) {
              const cartCourses = await prisma.cartCourses.create(
                {
                  data:{
                    courseId:isCourse.id,
                    userId:userCheck.id
                  
                }}
              );
      
              if (cartCourses) {
                return res.json({ message: 'success'});
              } else {
                return res.status(404).json({ message: "couldn't add to cart "});
              }
            } else {
              return res.status(400).json({ message: 'item present in cart' });
            }  
          } catch (error) {
            console.error("Error:", error);
            return res.status(500).json({ message: "Internal server error" }); // Handle internal server errors
          }finally{
            prisma.$disconnect();
          }
        
}