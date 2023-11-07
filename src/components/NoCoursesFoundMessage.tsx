export default function NoCoursesFoundMessage({type}:{type:string}){
    return(
        <div>
            {type=='all'&& (
                <>
                 <p className="p-2 font-medium  text-orange-400">Courses are not available at the moment</p>
                 <p className="p-2 font-medium  text-white">please refresh and try again after some time</p>
                 </>
               
            )}
           {type=='cart'&& (
                <div className="flex flex-col flex-wrap justify-center gap-1 overflow-auto mt-5 items-center h-[400px] w-full">
                 <div className="p-2 font-medium  text-blue-400 text-3xl">Cart is Empty</div>
                 <div className="p-2 font-medium  text-white">Add courses to the cart </div>
                 <a
                        href="/allCourses"
                        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-full w-max text-center  hover:bg-blue-600 transition duration-300"
                        >
                        Explore Courses
                </a>
                 </div>
               
            )}
           {type=='purchase'&& (
               <div className="flex flex-col flex-wrap justify-center gap-1 overflow-auto mt-5 items-center h-[400px] w-full">
               <div className="p-2 font-medium  text-blue-400 text-3xl">You haven't purchased any courses</div>
               <a
                     href="/allCourses"
                      className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-full w-max text-center  hover:bg-blue-600 transition duration-300"
                      >
                      Explore Courses
              </a>
               </div>
               
            )}
          
        </div>
    )
}