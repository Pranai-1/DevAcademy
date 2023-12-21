
import Navbar from "@/components/Base/navBar";
import { body, course } from "./api/user/interface";
import CourseCard from "@/components/Course/CourseCard";
import Footer from "@/components/Base/Footer";
import axios from "axios";
import {  NextApiRequest, NextApiResponse } from "next";
import InitUser from "@/components/InitUser";
import auth from "./api/user/auth";

import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import getEmail from "./api/helper/getEmail";
import LoadingIndicator from "@/components/LoadingIndicator";
import CourseParameters from "@/components/Course/CourseParameters";
import NoCoursesFoundMessage from "@/components/Course/NoCoursesFoundMessage";
import { CourseContext } from "@/components/AppContextProvider";



function AllCourses() {
  const{state}=useContext(CourseContext)
 

  const router = useRouter();
  return (
        <div className=" bg-black p-2">
          <p className="text-2xl text-orange-600 font-bold  pt-5  flex justify-center w-full">
            All Courses
          </p>
          <p className="hidden md:flex justify-center font-medium p-2 text-slate-300">
        Welcome to our extensive collection of courses. Discover a world of
        knowledge and opportunities to learn and grow.
      </p>
          <div className="h-[1200px] flex flex-wrap justify-center gap-10 overflow-auto mt-5">
          {state.isLoading ? (
            <LoadingIndicator /> 
        ) : (
          state.allCourses && state.allCourses.length > 0 ? (
          <CourseParameters courses={state.allCourses} type='all'/>
          ) : (
            <NoCoursesFoundMessage type='all'/> 
          )
        )}
          </div>
          <p className="text-gray-400 mb-4 flex justify-center">
        Don't hesitate to reach out if you have any questions or need guidance
        in choosing the right course for you.
      </p>
      
        </div>

  )
}
export default AllCourses;

//   export const getServerSideProps = async ({ req, res }: { req: NextApiRequest, res: NextApiResponse }) => {
 
//   let id:number | undefined,email:string | null,courses:course[];
//   try {
//     await auth(req, res);
//     id = Number(req.headers["userId"]);
//     console.log("id")
//   } catch (error) {
//     id = undefined; 
//   }

//   if(id){
//      email = await getEmail(id)
//   }else{
//   email=null;
//   }
//  console.log(email)
//     return { props: { email } };
 
// };



