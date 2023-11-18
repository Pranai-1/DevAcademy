import { course } from "@/pages/api/user/interface";
import axios from "axios";
import { useState, useEffect } from "react";
import CourseParameters from "./Course/CourseParameters";
import LoadingIndicator from "./LoadingIndicator";
import NoCoursesFoundMessage from "./Course/NoCoursesFoundMessage";

export default function Body(){

const[exploreCourses,setExploreCourses]=useState<course[]>();
  const[trendingCourses,setTrendingCourses]=useState<course[]>();
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
     const explore=getRandomCourses(courses, 3)
     console.log(explore)
      setExploreCourses(explore);
      const remainingCourses = courses.filter((course: course) => !exploreCourses?.includes(course));
      setTrendingCourses(getRandomCourses(remainingCourses, 3));
      setLoading(false)
   }
getCourses();

  },[])

  function getRandomCourses(courses: course[], count: number) {
    const shuffled = courses.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }


    return(
        <>
        <div className="h-full w-full">
        <h1 className="text-2xl font-medium p-2 m-4 mb-0 ml-10 text-orange-600">Let's Explore New Launches </h1>
        <div className=' flex flex-wrap justify-evenly p-2 gap-2 mt-2'>
        {loading ? (
            <LoadingIndicator /> 
        ) : (
          exploreCourses && exploreCourses.length > 0 ? (
          <CourseParameters courses={exploreCourses} type='all' setLength={setLength}/>
          ) : (
            <NoCoursesFoundMessage type='all'/> 
          )
        )}

        </div>
        <h1 className='text-2xl font-medium p-2 m-4 mb-0 ml-10 text-orange-600'>Trending Courses</h1>
        <div className=' flex flex-wrap justify-evenly p-5 mt-2'>
          {loading ? (
              <LoadingIndicator /> 
          ) : (
            trendingCourses && trendingCourses.length > 0 ? (
            <CourseParameters courses={trendingCourses} type='all' setLength={setLength}/>
            ) : (
              <NoCoursesFoundMessage type='all'/> 
            )
          )}
        </div>
      </div>
      <div className="mt-8 text-center grid gap-3 justify-center">
        <p className="md:text-lg md:text-white">
          Discover a world of learning opportunities with Dev Academy.
        </p>
        <a
          href="/allCourses"
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-full w-max text-center ml-36 mb-4 hover:bg-blue-600 transition duration-300"
        >
          Explore Courses
        </a>
      </div>

        </>
    )
}