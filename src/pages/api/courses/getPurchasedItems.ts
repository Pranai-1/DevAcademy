
import { NextApiRequest, NextApiResponse } from "next";

import { CourseModel, UserModel } from "@/lib/db";
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
const coursesId = userCheck.purchasedCourses;
if (coursesId.length > 0) {
const courses = await Promise.all(
  coursesId.map(async (courseId) => {
    const purchasedCourses: course | null = await CourseModel.findById(courseId);
  return purchasedCourses;
  })
);

return res.status(200).json({ courses: courses});
} else {
return res.status(200).json({ courses: [] });
}


}

