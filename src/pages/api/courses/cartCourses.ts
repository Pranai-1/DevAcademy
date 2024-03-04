
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { course } from "../user/interface";
import auth from "../user/auth";

const prisma=new PrismaClient()
export default async function handler(
    req:NextApiRequest,
    res:NextApiResponse
){
  let cartCourses:course[]=[]
  try{
    await auth(req,res)
  }catch(error){
    return res.status(404).json({ message: 'User not found' });
  }
const userId =Number(req.headers["userId"]);
if(!userId)
return res.status(200).json({ courses: []});
const userCheck = await prisma.user.findUnique({
  where: {
    id:userId
  },
  include: {
    cartCourses: true, 
  },
});
if (!userCheck) {
     return res.status(404).json({ message: 'User not found' });
}
try{
 const cartItems=userCheck.cartCourses
if(cartItems){
  for(let obj of cartItems){
    const x=await prisma.courses.findFirst({
     where:{
     id:obj.courseId
     }
    })
  if(x)
  cartCourses.push(x)
   
}
return res.status(200).json({ courses: cartCourses});
}
 else {
return res.status(200).json({ courses:cartCourses });
}
}catch(error){
  console.log(error)
  return res.status(404).json({ message: 'Error' });
 }
finally{
 prisma.$disconnect();
}

}

