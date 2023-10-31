import { NextApiRequest, NextApiResponse } from "next";
import { course } from "../user/interface";
import { PrismaClient } from "@prisma/client";

const prisma=new PrismaClient()
export default async function handler(
    req:NextApiRequest,
    res:NextApiResponse
){

    const userId = Number(req.body.id);
    try{
    const userCheck = await prisma.user.findFirst({where:{
      id:userId
    }});
        if (!userCheck) {
         return res.status(404).json({ message: 'User not found' });
        }
 
        const cartCourses= await prisma.cartCourses.findMany({
          where:{
            userId
          }
        });
        if(cartCourses)
 return res.status(200).json({ courses: cartCourses});
   else {
    return res.status(200).json({ courses: [] });
  }
}catch(error){
   console.log(error)
   return res.status(404).json({ message: 'Error' });
  }
finally{
  prisma.$disconnect();
}

  
}

