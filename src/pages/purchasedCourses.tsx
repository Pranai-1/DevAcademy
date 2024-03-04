import CourseParameters from "@/components/Course/CourseParameters";
import NoCoursesFoundMessage from "@/components/Course/NoCoursesFoundMessage";
import { useSelector } from "react-redux";



  export default function PurchasedCourses() { 
    const purchasedCourses=useSelector((state:any)=>state.purchase.purchasedCourses)
    
  return(
        <div className=" bg-black w-full p-2">
          <p className="text-2xl text-orange-600 font-bold  pt-5  flex justify-center">
           Purchased Courses
          </p>
          <p className="hidden md:flex justify-center font-medium p-2 text-slate-300">
          Welcome to your courses section. Happy Learning
      </p>
          <div className="h-max flex flex-wrap justify-center gap-10 overflow-auto mt-5">
          
          {purchasedCourses && purchasedCourses.length > 0 ? (
          <CourseParameters courses={purchasedCourses} type='purchased' />
          ) : (
            <NoCoursesFoundMessage type="purchased" /> 
          )
        }
          </div>
          <p className="text-gray-400 mb-4 flex justify-center">
        Don't hesitate to reach out if you have any questions or need guidance
        in choosing the right course for you.
      </p>
        </div>
  )
}





