import { useContext } from "react";
import CourseParameters from "./Course/CourseParameters";
import LoadingIndicator from "./LoadingIndicator";
import NoCoursesFoundMessage from "./Course/NoCoursesFoundMessage";
import { CourseContext } from "./CourseContextProvider";
import Shimmer from "@/components/Shimmer/Shimmer";

export default function Body(){
  const{courseState}=useContext(CourseContext)
  // console.log(courseState.newCourses)
  // console.log(courseState.trendingCourses)
    return(   
        <div className="h-full w-full">
        <h1 className="text-2xl font-medium p-2 m-4 mb-0 ml-10 text-orange-600">Let's Explore New Launches </h1>
        <div className=' flex flex-wrap justify-evenly p-2 gap-2 mt-2'>
        {courseState.isLoading ? (
            <Shimmer /> 
        ) : (
          courseState.newCourses && courseState.newCourses.length > 0 ? (
          <CourseParameters courses={courseState.newCourses} type='all' />
          ) : (
            <NoCoursesFoundMessage type='all'/> 
          )
        )}

        </div>
        <h1 className='text-2xl font-medium p-2 m-4 mb-0 ml-10 text-orange-600'>Trending Courses</h1>
        <div className=' flex flex-wrap justify-evenly p-5 mt-2'>
          {courseState.isLoading ? (
              <Shimmer /> 
          ) : (
            courseState.trendingCourses && courseState.trendingCourses.length > 0 ? (
            <CourseParameters courses={courseState.trendingCourses} type='all' />
            ) : (
              <NoCoursesFoundMessage type='all'/> 
            )
          )}
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
      </div>
    )
}