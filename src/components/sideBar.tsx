import Link from 'next/link'; 
import { useRouter } from 'next/router';

interface Props {
  bar: boolean;
  userEmail: string | null;
  sidebar(): void;
  logout(): void;
  closeSidebar(): void;
}

const Sidebar = (props: Props) => {
  let { bar, userEmail, sidebar, logout, closeSidebar } = props;
  const router = useRouter(); 
 
 
  return (
    <div className="md:hidden">
      <button
        className="font-bold text-3xl ml-2 cursor-pointer"
        onClick={sidebar}
      >
        &#8801;
      </button>
      {bar && (
        userEmail ? (
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
        ) : (
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
      )}
    </div>
  );
};

export default Sidebar;
