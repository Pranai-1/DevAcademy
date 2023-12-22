import Footer from "@/components/Base/Footer";
import CourseParameters from "@/components/Course/CourseParameters";
import NoCoursesFoundMessage from "@/components/Course/NoCoursesFoundMessage";
import InitUser from "@/components/InitUser";
import LoadingIndicator from "@/components/LoadingIndicator";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { useState, useEffect, useContext } from "react";
import getEmail from "./api/helper/getEmail";
import auth from "./api/user/auth";
import { course } from "./api/user/interface";
import { cartContext } from "@/components/CartContextProvider";


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
    const[cartCourses,setCartCourses]=useState<course[]>();
    const[loading,setLoading]=useState<boolean>(true);
    const [length,setLength]=useState<number>(0)
    const{cart}=useContext(cartContext)
    console.log(cart.cartCourses)
    useEffect(()=>{
      console.log("Hello")
      const getCourses=async()=>{
       let courses:course[]=[]
       try{
        const response=await axios.get("/api/courses/cartCourses")
        courses=response.data.courses
        }catch{
      courses=[]
        }
        setLength(courses.length)
    
        setCartCourses(courses)
         setLoading(false)
      }
   getCourses();
     },[])
  return(
        <div className=" bg-black w-full p-2">
          <p className="text-2xl text-orange-600 font-bold  pt-5  flex justify-center">
           Cart Courses
          </p>
          <p className="hidden md:flex justify-center font-medium p-2 text-slate-300">
          Welcome to your shopping cart. Here, you can review and manage the
          courses you've added to your cart.
      </p>
          <div className="h-max flex flex-wrap justify-center gap-10 overflow-auto mt-5">
          {loading ? (
            <LoadingIndicator /> 
        ) : (
          cartCourses && length > 0 ? (
          <CourseParameters courses={cartCourses} type='cart'/>
          ) : (
            <NoCoursesFoundMessage type="cart" /> 
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





