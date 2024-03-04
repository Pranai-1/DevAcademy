import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { courseReducer } from "./reducer";
import { course } from "@/pages/api/user/interface";
import axios from "axios";




const CourseContext=createContext<any>([])

function CourseContextProvider({children}:{children: React.ReactNode }){
    const initialState={
        isLoading:false,
        allCourses:[],
        isAllCoursesError:false,
        newCourses:[],
        trendingCourses:[],
        singleCourse:{},
        isSingleCourseLoading:false,
        isSingleCourseError:false,
    }

    const[courseState,dispatch]=useReducer(courseReducer,initialState)
 

    async function getAllCourses() {
        let courses:course[]=[]
        dispatch({type:"ALL_COURSES_LOADING"})
        try{
         const response=await axios.get("/api/courses/all")
         courses=response.data.courses
        // const data=allCourses()//we cannot do this,reason behind
         dispatch({type:"ALL_COURSES",payload:courses})
         }catch{
         dispatch({type:"ALL_COURSES_ERROR",payload:[]})
         } 
    }
    
    async function getSingleCourse(url:string){
      let singleCourse={}
      dispatch({type:"SINGLE_COURSE_LOADING"})
        try{
         const response=await axios.get(`${url}`)
         singleCourse=response.data.course
        
         dispatch({type:"SINGLE_COURSE",payload:singleCourse})
         }catch{
         dispatch({type:"SINGLE_COURSE_ERROR",payload:{}})
         } 
    }

  useEffect(()=>{
    getAllCourses()
   
  },[])

    return(
        <CourseContext.Provider value={{courseState,getSingleCourse}}>{children}</CourseContext.Provider>
    )
}


export {CourseContextProvider,CourseContext}

// /PrismaClient code is only used in server-side Node.js environments, such as in an API route or a backend server script. 
//PrismaClient should not be imported or used in client-side JavaScript code that runs in the browser.