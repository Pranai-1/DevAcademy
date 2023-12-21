import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { reducer } from "./reducer";
import { course } from "@/pages/api/user/interface";
import axios from "axios";
import InitUser from "./InitUser";


const CourseContext=createContext<any>([])

function AppContextProvider({children}:{children:any}){
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

    const[state,dispatch]=useReducer(reducer,initialState)
    const[email,setEmail]=useState<string|null>()

    async function getAllCourses() {
        let courses:course[]=[]
        dispatch({type:"ALL_COURSES_LOADING"})
        try{
         const response=await axios.get("/api/courses/all")
         courses=response.data.courses
        
         dispatch({type:"ALL_COURSES",payload:courses})
         }catch{
         dispatch({type:"ALL_COURSES_ERROR",payload:[]})
         } 
    }
    
    async function getSingleCourse(url:any){
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
    getEmail()
  },[])
  async function getEmail() {
    try{
        const response=await axios.get("/api/user/email")
        setEmail(response.data.email)
        }catch{
         setEmail(null)
        } 
}
    return(
        <CourseContext.Provider value={{state,email,setEmail,getSingleCourse}}>{children}</CourseContext.Provider>
    )
}

const useCoursesContext=()=>{
    return useContext(CourseContext);
}

export {AppContextProvider,CourseContext}


