import { useContext } from "react";
import CourseParameters from "@/components/Course/CourseParameters";
import NoCoursesFoundMessage from "@/components/Course/NoCoursesFoundMessage";
import { CourseContext } from "@/components/CourseContextProvider";
import Shimmer from "../components/Shimmer";


function AllCourses() {
  const{courseState}=useContext(CourseContext)
 
  return (
        <div className=" bg-black p-2">
          <p className="text-2xl text-orange-600 font-bold  pt-5  flex justify-center w-full">
            All Courses
          </p>
          <p className="hidden md:flex justify-center font-medium p-2 text-slate-300">
        Welcome to our extensive collection of courses. Discover a world of
        knowledge and opportunities to learn and grow.
      </p>
          <div className="h-[1200px] flex flex-wrap justify-center gap-10 overflow-auto mt-5">
          {courseState.isLoading ? (
            <div>
            <Shimmer /> 
            <Shimmer /> 
            </div>
        ) : (
          courseState.allCourses && courseState.allCourses.length > 0 ? (
          <CourseParameters courses={courseState.allCourses} type='all'/>
          ) : (
            <NoCoursesFoundMessage type='all'/> 
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
export default AllCourses;



