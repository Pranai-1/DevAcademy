
import axios from "axios";
import CourseCard from "@/components/CourseCard";
import Footer from "@/components/Footer";
import { body, course } from "./api/user/interface";
import { NextApiRequest, NextApiResponse } from "next";
import auth from "./api/user/auth";
import InitUser from "@/components/InitUser";
import Navbar from "@/components/navBar";
import Link from "next/link";
import { useState } from "react";
import getPurchasedItems from "./api/helper/getPurchasedItems";
import getEmail from "./api/helper/getEmail";


export async function getServerSideProps({req,res}:{req:NextApiRequest,res:NextApiResponse}){
  let id,email:string | null,purchasedCourses : course[];
  try {
    await auth(req, res);
    id =Number(req.headers["userId"]);
  } catch (error) {
    id = undefined; 
  }

  if(id){
    email = await getEmail(id)
 }else{
 email=null;
 }
try{
  if(id)
  purchasedCourses = await getPurchasedItems(id);
 else
 purchasedCourses=[]
}catch{
  purchasedCourses=[]
}
  if(purchasedCourses.length>0){
   return{
    props:{
      purchasedCourses,
      email
    }}}else{
    return{
      props:{
        purchasedCourses:[],
        email
      } }}}


export default function PurchasedCourses({purchasedCourses,email}:{purchasedCourses:course[],email:string}) {
  const [length,setLength]=useState<number>(purchasedCourses.length)
  function remove(){
    setLength(length-1)
}
  return (
    <>
      <InitUser email={email}/>
  <Navbar/>
  {email==null ?(
       <>
      <div className="h-screen w-screen flex justify-center items-center bg-white">
  <div className="text-center">
    <h1 className="text-4xl font-bold  mb-4 text-orange-500">Welcome to Dev Academy</h1>
    <p className="text-xl  mb-8">Explore a world of learning opportunities!</p>
    <Link href="/login"  className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 focus:outline-none">
      Login to Access Your Courses
    </Link>
  </div>
</div>
 <Footer />
       </>

    ):(
      <>
      {purchasedCourses.length === 0 ? (
        <>
          <div className="h-screen w-screen flex justify-center items-center overflow-hidden">
            <p className="text-2xl text-blue-600 font-bold h-max w-max  ">
              You haven't purchased courses
            </p>
          </div>
          <Footer />
        </>
      ) : (
        <div className="w-screen h-full bg-white pb-0 mb-0 overflow-hidden">
          <p className="text-xl text-blue-600 font-bold p-3 w-screen flex justify-center pt-5">
            Purchased Courses
          </p>
          <p className="hidden md:text-gray-600 md:flex justify-center font-medium">
            Welcome to your purchased courses section. Here, you can access all
            the amazing courses you've bought and start your learning journey.
          </p>

          <div className="p-3 flex flex-wrap justify-center">
            {purchasedCourses.map((course:course) => (
              <CourseCard
              key={course.id} 
                id={course.id}
                image={course.image}
                title={course.title}
                description={course.description}
                name={course.name}
                show="purchased"
                remove={remove}
                price={course.price}
              />
            ))}
          </div>
          <p className="text-gray-600 mb-4 flex justify-center">
            If you have any questions or need assistance, feel free to contact
            our support team.
          </p>
          <Footer />
        </div>
      )}
      </>
    )}
    </>
  );
}

