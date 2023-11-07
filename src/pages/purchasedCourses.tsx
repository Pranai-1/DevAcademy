

import axios from "axios";

import { body, course } from "./api/user/interface";
import CourseCard from "../components/CourseCard";
import Footer from "../components/Footer";
import { NextApiRequest, NextApiResponse } from "next";
import auth from "./api/user/auth";
import InitUser from "@/components/InitUser";
import Navbar from "@/components/navBar";
import { useEffect, useState } from "react";
import getEmail from "./api/helper/getEmail";
import getCartItems from "./api/helper/getCartItems";
import CourseParameters from "@/components/CourseParameters";
import LoadingIndicator from "@/components/LoadingIndicator";
import NoCoursesFoundMessage from "@/components/NoCoursesFoundMessage";
import allCourses from "./allCourses";

export async function getServerSideProps({req,res}:{req:NextApiRequest,res:NextApiResponse}){
  let id:number | undefined,email:string | null
  
  try {
    await auth(req, res);
    id=Number(req.headers["userId"])
  } catch (error) {
    id = undefined; 
  }
  if(id){
    email = await getEmail(id)
 }else{
  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
 }
   return{
    props:{
      email
    
    }}
  }

  export default function PurchasedCourses({email}:{email:string}) { 
   
    const[purchasedCourses,setPurchasedCourses]=useState<any>();
    const[loading,setLoading]=useState<boolean>(true);
    const [length,setLength]=useState<number>(0)
    
    useEffect(()=>{
      const getCourses=async()=>{
       let courses:course[]=[]
       try{
        const response=await axios.get("/api/courses/getPurchasedItems")
        courses=response.data.courses
        }catch{
      courses=[]
        }
        setLength(courses.length)
        console.log(courses.length)
        setPurchasedCourses(courses)
         setLoading(false)    
       
      }
   getCourses();
   
     },[])
  return(
    <>
    <InitUser email={email}/>
        <div className=" bg-black w-screen">
          <p className="text-2xl text-orange-600 font-bold  w-screen pt-5  flex justify-center">
           Purchased Courses
          </p>
          <p className="hidden md:flex justify-center font-medium p-2 text-slate-300">
          Welcome to your courses section. Happy Learning
      </p>
          <div className="h-[600px] flex flex-wrap justify-center gap-10 overflow-auto mt-5">
          {loading ? (
            <LoadingIndicator /> 
        ) : (
          purchasedCourses && purchasedCourses.length > 0 ? (
          <CourseParameters courses={purchasedCourses} type='purchased' setLength={setLength}/>
          ) : (
            <NoCoursesFoundMessage type="purchased" /> 
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
  )


}





