import router from "next/router";
import  Link  from "next/link";

export default function LoggedInUserSidebar({closeSidebar}:{closeSidebar():void}){
    return(
        <div className="h-screen bg-gray-200 w-max mt-2 p-2">
        <ul className="grid pr-8 justify-center gap-5">
          <li>
            <Link href="/allCourses" >
              <div
                onClick={closeSidebar}
                className={`font-medium text-gray-700 p-2 cursor-pointer hover:text-orange-600 ${
                  router.pathname === '/user/courses/all' ? 'active' : ''
                }`}
              >
                Courses
              </div>
            </Link>
          </li>
          <li>
            <Link href="/purchasedCourses" >
              <div
                onClick={closeSidebar}
                className={`font-medium text-gray-700 p-2 cursor-pointer hover:text-orange-600 ${
                  router.pathname === '/user/courses/purchased' ? 'active' : ''
                }`}
              >
                My Learning
              </div>
            </Link>
          </li>
         
        
        
        </ul>
      </div>
    )
}