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
 
        const purchasedCourses= await prisma.purchasedCourses.findMany({
          where:{
            userId:id
          }
        });
        if(purchasedCourses){
        let courses=[]
        for(let obj of purchasedCourses){
           const x=await prisma.courses.findFirst({
            where:{
            id:obj.courseId
            }
           })
          
           courses.push(x)
          
      }
     
      return courses

    }
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

