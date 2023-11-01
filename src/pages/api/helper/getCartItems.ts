import { NextApiRequest, NextApiResponse } from "next";
import { course } from "../user/interface";
import { PrismaClient } from "@prisma/client";

const prisma=new PrismaClient()
export default async function handler(
   id:number
){    
    try{
    const userCheck = await prisma.user.findFirst({where:{
      id
    }});
        if (!userCheck) {
         return [];
        }
 
        const cartCourses= await prisma.cartCourses.findMany({
          where:{
            userId:id
          }
        });
        if(cartCourses)
 return cartCourses;
   else {
    return [];
  }
}catch(error){
   console.log(error)
   return [];
  }
finally{
  prisma.$disconnect();
}

  
}

