import { NextApiRequest, NextApiResponse } from "next";
import auth from "../../user/auth";
import { PrismaClient } from "@prisma/client";

const prisma=new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await auth(req,res)
  try {
    console.log(req.query)
    const courseId = Number(req.query.id);
     console.log(courseId)
    if (!courseId) { 
      return res.status(400).json({ message: "Course ID is missing in the request" });
    }
    const courseDetails: any= await prisma.courses.findFirst({where:{id:courseId}});
    if (courseDetails) {
      let requiredDetails = {
        title: courseDetails.title,
        description: courseDetails.description,
        price: courseDetails.price,
        author: courseDetails.name 
      };
     
      return res.status(200).json({courses:requiredDetails}); // Sending the object directly without wrapping it in another object
    } else {
      return res.status(404).json({ message: "Course not found" }); // Changed status code to 404 for "not found" case
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" }); // Handle internal server errors
  }finally{
    prisma.$disconnect();
  }
}
