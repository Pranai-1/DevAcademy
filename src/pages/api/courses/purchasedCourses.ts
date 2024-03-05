
import { NextApiRequest, NextApiResponse } from "next";
import { course } from "../user/interface";
import { PrismaClient } from "@prisma/client";
import auth from "../user/auth";

const prisma=new PrismaClient()
export default async function handler(
    req:NextApiRequest,
    res:NextApiResponse
){
  let purchasedCourses:course[]=[]
  try{
    await auth(req,res)
  }catch(error){
    return res.status(404).json({ message: 'User not found' });
  }
const userId =Number(req.headers.userId);
if(!userId)
return
const userCheck = await prisma.user.findFirst({where:{
  id:userId
},
  include:{
      purchasedCourses:true
  }
});

if (!userCheck) {
     return 
}
try{
const purchasedItems=userCheck.purchasedCourses
if(purchasedItems){
  for(let obj of purchasedItems){
    const x=await prisma.courses.findFirst({
     where:{
     id:obj.courseId
     }
    })
   if(x)
   purchasedCourses.push(x)
   
}

return res.status(200).json({ courses: purchasedCourses});
}
 else {
return res.status(200).json({ courses: purchasedCourses });
}
}catch(error){
  console.log(error)
  return res.status(404).json({ message: 'Error' });
 }
finally{
 prisma.$disconnect();
}

}

