import { UserState } from "@/store/atoms/user";
import { UserEmail } from "@/store/selectors/userDetails";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import LoggedInUser from "../User/LoggedInUser";
import LoggedOutUser from "../User/LoggedOutUser";
import Sidebar from "./sideBar";
import { CourseContext } from "../AppContextProvider";
import { emailContext } from "../EmailContextProvider";
import { cartContext } from "../CartContextProvider";
import { useSelector } from "react-redux";




function Navbar() {
  const router = useRouter();
  const [bar, setBar] = useState<boolean>(false);
  const {emailState} = useContext(emailContext);
  const{updateEmailStatus}=useContext(emailContext)
  const cart=useSelector((state:any)=>state.cartCourses)
  console.log(emailState.email)
  function sidebar() {
    setBar((prev) => !prev);
  }

  function closeSidebar() {
    setBar(false);
  }

  async function logout() {
   const res=await axios.get(`/api/user/logout`)
   updateEmailStatus(null)
      router.push("/");
    closeSidebar();
  }

  function isActive(route: string) {
    return router.pathname === route ? 'text-orange-600' : 'text-black';
  }

  return (
    <>
      <div className="w-full h-[45px] bg-gray-200 flex justify-between relative">
        <Sidebar
          bar={bar}
          userEmail={emailState.email}
          sidebar={sidebar}
          logout={logout}
          closeSidebar={closeSidebar}
        />

        <Link href="/" className="font-bold text-xl flex items-center justify-center ml-2 text-red-600 ">Dev Academy</Link>
        
        <div className="md:hidden flex">
        <Link href="/cart" className="md:hidden mr-10 text-lg flex justify-between items-center cursor-pointer hover:text-blue-600">
         <i className="fa fa-shopping-cart"></i>
         </Link>
        {emailState.email && 
        <button
        onClick={logout}
        className="md:hidden p-1 m-1 mr-5 bg-indigo-600 rounded hover:bg-indigo-800 text-white cursor-pointer"
      >
        Logout
      </button>}
        
        </div>
        <ul className="hidden md:flex md:justify-center md:items-center gap-14">
          <li>
            <Link href="/" className={`md:font-medium cursor-pointer hover:text-blue-600 ${isActive('/')}`}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/allCourses" className={`md:font-medium cursor-pointer hover:text-blue-600 ${isActive('/allCourses')}`}>
              Courses
            </Link>
          </li>
          <li>
            <Link href="/cart" className={`md:font-medium cursor-pointer hover:text-blue-600 ${isActive('/cart')}`}>
          
                <i className="fa fa-shopping-cart "></i>
                <span >Cart({cart.length})</span>
          
            </Link>
          </li>
          <li>
            <Link href="/purchasedCourses" >
           
                <span className={`md:font-medium cursor-pointer hover:text-blue-600 ${isActive('/purchasedCourses')}`}>My Learning</span>
          
            </Link>
          </li>
        </ul>

        {emailState.email ? (
           <LoggedInUser userEmail={emailState.email} logout={logout}/>
    ) : (
       <LoggedOutUser/>
    )}
      </div>
    </>
  );
}

export default Navbar;
