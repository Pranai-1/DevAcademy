
import { NextApiRequest, NextApiResponse } from "next";

import { CourseModel, UserModel } from "@/lib/db";

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
  coursesId.map(async (course) => {
    const purchasedCourses: any | null = await CourseModel.findById(course);
  return purchasedCourses;
  })
);

return res.status(200).json({ courses: courses});
} else {
return res.status(200).json({ courses: [] });
}


}

