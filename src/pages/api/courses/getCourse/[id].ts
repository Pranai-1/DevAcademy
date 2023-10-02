import { NextApiRequest, NextApiResponse } from "next";
import { CourseModel } from "@/lib/db";
import { course } from "../../user/interface";
import auth from "../../user/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await auth(req,res)
  try {
    console.log(req.query)
    const courseId = req.query.id as string;
     console.log(courseId)
    if (!courseId) {
      
      return res.status(400).json({ message: "Course ID is missing in the request" });
    }

    const courseDetails: any= await CourseModel.findById(courseId);

    if (courseDetails) {
      let requiredDetails = {
        title: courseDetails.title,
        description: courseDetails.description,
        price: courseDetails.price,
        author: courseDetails.name // Use the correct property name from your schema
      };
     
      return res.status(200).json({courses:requiredDetails}); // Sending the object directly without wrapping it in another object
    } else {
      return res.status(404).json({ message: "Course not found" }); // Changed status code to 404 for "not found" case
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" }); // Handle internal server errors
  }
}
