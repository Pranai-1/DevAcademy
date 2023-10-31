
import { NextApiRequest, NextApiResponse } from "next";
import { course } from "../user/interface";
import { PrismaClient } from "@prisma/client";

const prisma=new PrismaClient()
export default async function handler(
    req:NextApiRequest,
    res:NextApiResponse
){
const userId =Number(req.body.id);
const userCheck = await prisma.user.findFirst({where:{id:userId}});
if (!userCheck) {
     return res.status(404).json({ message: 'User not found' });
}
try{
const purchasedCourses= await prisma.purchasedCourses.findMany({
  where:{
    userId
  }
});
if(purchasedCourses)
return res.status(200).json({ courses: purchasedCourses});
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

