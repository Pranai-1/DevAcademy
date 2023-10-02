import { UserModel, CourseModel } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { course } from "../user/interface";

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
      coursesId.map(async (courseId) => {
        const cartCourses: course | null = await CourseModel.findById(courseId);
      return cartCourses;
      })
    );
 return res.status(200).json({ courses: courses});
  } else {
    return res.status(200).json({ courses: [] });
  }
  
}

