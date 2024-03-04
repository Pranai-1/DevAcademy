import { course } from "../user/interface";
import { PrismaClient } from "@prisma/client";

const prisma=new PrismaClient()
export default async function handler(
   id:number
){    
  let courses:course[]=[]
    try{
    
        const user = await prisma.user.findUnique({
          where: {
            id
          },
          include: {
            cartCourses: true, 
          },
        });
        if(!user)
        return courses
      const cartCourses=user?.cartCourses
        if(cartCourses){
        for(let obj of cartCourses){
           const x=await prisma.courses.findFirst({
            where:{
            id:obj.courseId
            }
           })
         if(x)
           courses.push(x)
      }
    }
    return courses;
}catch(error){
   console.log(error)
   return courses;
  }
finally{
  prisma.$disconnect();
}
  
}

