

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

  export default function cartCourses({email}:{email:string}) { 
   
    const[cartCourses,setCartCourses]=useState<any>();
    const[loading,setLoading]=useState<boolean>(true);
    const [length,setLength]=useState<number>(0)
    useEffect(()=>{
      const getCourses=async()=>{
       let courses:course[]=[]
       try{
        const response=await axios.get("/api/courses/cartCourses")
        courses=response.data.courses
        }catch{
      courses=[]
        }
        setLength(courses.length)
        console.log(courses.length)
        setCartCourses(courses)
         setLoading(false)
       
        
       
      }
   getCourses();
   
     },[])
  return(
    <>
    <InitUser email={email}/>
        <div className=" bg-black w-screen">
          <p className="text-2xl text-orange-600 font-bold  w-screen pt-5  flex justify-center">
           Cart Courses
          </p>
          <p className="hidden md:flex justify-center font-medium p-2 text-slate-300">
          Welcome to your shopping cart. Here, you can review and manage the
          courses you've added to your cart.
      </p>
          <div className="h-[600px] flex flex-wrap justify-center gap-10 overflow-auto mt-5">
          {loading ? (
            <LoadingIndicator /> 
        ) : (
          cartCourses && length > 0 ? (
          <CourseParameters courses={cartCourses} type='cart' setLength={setLength}/>
          ) : (
            <NoCoursesFoundMessage type="cart" /> 
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





