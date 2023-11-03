import { NextApiRequest, NextApiResponse } from "next";
import { course } from "../user/interface";
import { PrismaClient } from "@prisma/client";

const prisma=new PrismaClient()
export default async function handler(
   id:number
){    
  let courses:course[]=[]
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
       
        for(let obj of purchasedCourses){
           const x=await prisma.courses.findFirst({
            where:{
            id:obj.courseId
            }
           })
          if(x)
           courses.push(x)
          
      }
     
      return courses

    }
   else {
    return courses;
  }
}catch(error){
   console.log(error)
   return courses;
  }
finally{
  prisma.$disconnect();
}

  
}

