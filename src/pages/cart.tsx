import CourseParameters from "@/components/Course/CourseParameters";
import NoCoursesFoundMessage from "@/components/Course/NoCoursesFoundMessage";
import { useSelector } from "react-redux";



  export default function cartCourses() { 
   
    const cart=useSelector((state:any)=>state.cart.cartCourses)//right way of subscribing
   // const entireStore=useSelector((state:any)=>state)//wrong way of subscribing because here entireStore is subscribed fully
    //with our store,any changes in our store will make this page to re-render in case of multiple slices,this is in efficient
    //const coursesFromEntireStore=entireStore.cart.courses
   // console.log(cart)

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
        {
          cart.length > 0 ? (
            <CourseParameters courses={cart} type='cart'/>
            ) : (
              <NoCoursesFoundMessage type="cart" /> 
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





