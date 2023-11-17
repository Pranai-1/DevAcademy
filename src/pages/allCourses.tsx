
import Navbar from "@/components/Base/navBar";
import { body, course } from "./api/user/interface";
import CourseCard from "@/components/Course/CourseCard";
import Footer from "@/components/Base/Footer";
import axios from "axios";
import {  NextApiRequest, NextApiResponse } from "next";
import InitUser from "@/components/InitUser";
import auth from "./api/user/auth";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import getEmail from "./api/helper/getEmail";
import LoadingIndicator from "@/components/LoadingIndicator";
import CourseParameters from "@/components/Course/CourseParameters";
import NoCoursesFoundMessage from "@/components/Course/NoCoursesFoundMessage";



function AllCourses({email}:{email:string}) {

  const[allCourses,setAllCourses]=useState<course[]>();
  const[loading,setLoading]=useState<boolean>(true);
  const [length,setLength]=useState<number>(0)
  useEffect(()=>{
    const getCourses=async()=>{
     let courses:course[]=[]
     try{
      const response=await axios.get("/api/courses/all")
      courses=response.data.courses
      }catch{
    courses=[]
      }
      setAllCourses(courses)
       setLoading(false)
    }
 getCourses();
 
   },[])
 

  const router = useRouter();
  return (
    <>
     <InitUser email={email}/>
        <div className=" bg-black w-screen">
          <p className="text-2xl text-orange-600 font-bold  w-screen pt-5  flex justify-center">
            All Courses
          </p>
          <p className="hidden md:flex justify-center font-medium p-2 text-slate-300">
        Welcome to our extensive collection of courses. Discover a world of
        knowledge and opportunities to learn and grow.
      </p>
          <div className="h-[1200px] flex flex-wrap justify-center gap-10 overflow-auto mt-5">
          {loading ? (
            <LoadingIndicator /> 
        ) : (
          allCourses && allCourses.length > 0 ? (
          <CourseParameters courses={allCourses} type='all' setLength={setLength}/>
          ) : (
            <NoCoursesFoundMessage type='all'/> 
          )
        )}
          </div>
          <p className="text-gray-400 mb-4 flex justify-center">
        Don't hesitate to reach out if you have any questions or need guidance
        in choosing the right course for you.
      </p>
          <Footer/>
        </div>
    </>
  );
}
export default AllCourses;

  export const getServerSideProps = async ({ req, res }: { req: NextApiRequest, res: NextApiResponse }) => {
 
  let id:number | undefined,email:string | null,courses:course[];
  try {
    await auth(req, res);
    id = Number(req.headers["userId"]);
    console.log("id")
  } catch (error) {
    id = undefined; 
  }

  if(id){
     email = await getEmail(id)
  }else{
  email=null;
  }
 console.log(email)
    return { props: { email } };
 
};



