
import Navbar from "@/components/navBar";
import { body, course } from "./api/user/interface";
import CourseCard from "@/components/CourseCard";
import Footer from "@/components/Footer";
import axios from "axios";
import { GetServerSideProps, NextApiRequest, NextApiResponse } from "next";
import InitUser from "@/components/InitUser";
import auth from "./api/user/auth";
import { NEXT_URL } from "@/config";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import allCourses from "./api/helper/allCourses";
import getEmail from "./api/helper/getEmail";

function getRandomCourses(courses:any, count:any) {
  const shuffled = courses.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}


function AllCourses({courses,email}:any) {
  const router = useRouter();
  return (
    <>
    <InitUser email={email}/>
    <Navbar/>
      {courses.length === 0 ? (
        <>
          <div className="h-screen flex justify-center items-center">
            <p className="text-2xl text-blue-600 font-bold h-max w-max">
              Courses are not available
            </p>
          </div>
          <Footer/>
        </>
      ) : (
        <div className=" bg-white w-screen">
          <p className="text-xl text-blue-600 font-bold  w-screen pt-5  flex justify-center">
            All Courses
          </p>
          <p className="hidden md:text-gray-600 md:flex justify-center font-medium p-2">
        Welcome to our extensive collection of courses. Discover a world of
        knowledge and opportunities to learn and grow.
      </p>
     
      
          <div className=" flex flex-wrap justify-center">
            {courses.map((course:course) => (
              <CourseCard
              key={course.id} 
                id={course.id}
                image={course.image}
                title={course.title}
                description={course.description}
                name={course.name}
                show="all"
                price={course.price} 
              />
            ))}
          </div>
          <p className="text-gray-600 mb-4 flex justify-center">
        Don't hesitate to reach out if you have any questions or need guidance
        in choosing the right course for you.
      </p>
          <Footer/>
        </div>
      )}
    </>
  );
}
export default AllCourses;

  export const getServerSideProps = async ({ req, res }: { req: NextApiRequest, res: NextApiResponse }) => {
 
  let id:number | undefined,email:string | null,courses:any;
  try {
    await auth(req, res);
    id = Number(req.headers["userId"]);
  } catch (error) {
    id = undefined; 
  }

  if(id){
     email = await getEmail(id)
  }else{
  email=null;
  }
  try{
     courses = await allCourses();
    }catch{
  courses=[]
    }
    return { props: { courses,email } };
 
};



