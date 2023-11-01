

import axios from "axios";

import { body, course } from "./api/user/interface";
import CourseCard from "../components/CourseCard";
import Footer from "../components/Footer";
import { NextApiRequest, NextApiResponse } from "next";
import auth from "./api/user/auth";
import InitUser from "@/components/InitUser";
import Navbar from "@/components/navBar";
import { useEffect, useState } from "react";
import { NEXT_URL } from "@/config";
import getEmail from "./api/helper/getEmail";
import getCartItems from "./api/helper/getCartItems";

export async function getServerSideProps({req,res}:{req:NextApiRequest,res:NextApiResponse}){
  let id,email:string | null,cartCourses : any;
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
  cartCourses = await getCartItems(id);
 else
 cartCourses=[]
}catch{
  cartCourses=[]
}
  if(cartCourses.length>0){
   return{
    props:{
      cartCourses,
      email
    }}}else{
    return{
      props:{
        cartCourses:[],
        email
      } }}}


  export default function cartCourses({cartCourses,email}:{cartCourses:course[],email:string}) { 
    const [length,setLength]=useState<number>(cartCourses.length)

    function remove(){
       setLength(length-1)
   }
  return(
    <>
    <InitUser email={email}/>
    <Navbar/>
    {email==null ?(
       <>
      <div className="h-screen w-screen flex justify-center items-center bg-white">
  <div className="text-center">
    <h1 className="text-4xl font-bold text-indigo-600 mb-4">Login to Access Your Cart</h1>
    <p className="text-lg text-gray-600 mb-8">Please log in to view and manage your shopping cart.</p>
    <a
      href="/login" 
      className="bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 focus:outline-none text-lg"
    >
      Log In
    </a>
  </div>
 
</div>
    
       </>

    ):(
      <>
       {length==0?(
          <>
          <div className="h-screen w-screen flex  justify-center items-center bg-white">
           <p className="text-2xl text-blue-600 font-bold h-max w-max  ">Cart is Empty</p>
          
           </div>
        
          </>
        ):(
        
      <div className=" w-screen h-auto bg-white ">
        <p className="text-xl text-blue-600 font-bold pt-5 w-screen flex justify-center">Cart Items</p>
        <p className="hidden md:text-gray-600 md:flex justify-center font-medium p-2">
        Welcome to your shopping cart. Here, you can review and manage the
        courses you've added to your cart.
      </p>
      
      
        <div className=" p-3 flex flex-wrap justify-center">
         
             {cartCourses.map((course:course) => (
              <CourseCard 
              key={course.id} 
                id={course.id}
                image={course.image}
                title={course.title}
                description={course.description}
                name={course.name}
                show="cart" 
                remove={remove}
                price={course.price} 
              />
            ))}
       
        </div>
        <p className="text-gray-600 mb-4 flex justify-center">
        If you have any questions or need assistance with your order, our
        support team is here to help.
      </p>
        <Footer/>
      </div>
)}
      </>
    )
    }
    
    </>
  )


}

