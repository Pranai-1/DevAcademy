import router from "next/router";
import  Link  from "next/link";

export default function LoggedOutUserSidebar({closeSidebar}:{closeSidebar():void}){
return(
    <div className="h-screen bg-gray-200 w-max mt-2 p-2">
            <ul className="grid pr-8 justify-center gap-5">
              <li>
                <Link href="/signup" >
                  <div
                    onClick={closeSidebar}
                    className={`font-medium text-gray-700 p-2 cursor-pointer hover:text-orange-600 ${
                      router.pathname === '/user/signup' ? 'active' : ''
                    }`}
                  >
                    Signup
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/login" >
                  <div
                    onClick={closeSidebar}
                    className={`font-medium text-gray-700 p-2 cursor-pointer hover:text-orange-600 ${
                      router.pathname === '/user/login' ? 'active' : ''
                    }`}
                  >
                    Login
                  </div>
                </Link>
              </li>
            </ul>
          </div>
)
}