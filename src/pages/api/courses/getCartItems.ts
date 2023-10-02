import { UserModel, CourseModel } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req:NextApiRequest,
    res:NextApiResponse
){

    const userId = req.body.id;
    const userCheck = await UserModel.findById(userId);
        if (!userCheck) {
         return res.status(404).json({ message: 'User not found' });
        }
  const coursesId = userCheck.cart;
     if (coursesId.length > 0) {
    const courses = await Promise.all(
      coursesId.map(async (course) => {
        const cartCourses: any | null = await CourseModel.findById(course);
      return cartCourses;
      })
    );
 return res.status(200).json({ courses: courses});
  } else {
    return res.status(200).json({ courses: [] });
  }
  
}

