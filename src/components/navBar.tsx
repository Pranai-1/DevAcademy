import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link"; 
import { UserState } from "@/store/atoms/user";
import { UserEmail } from "@/store/selectors/userDetails";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Sidebar from "./sideBar";
import axios from "axios";



function Navbar() {
  const router = useRouter();
  const [bar, setBar] = useState<boolean>(false);
  const userEmail = useRecoilValue(UserEmail);
  const userState = useSetRecoilState(UserState);

  function sidebar() {
    setBar((prev) => !prev);
  }

  function closeSidebar() {
    setBar(false);
  }

  async function logout() {
   const res=await axios.get("http://localhost:3000/api/user/logout")
    userState({
      userEmail: null,
      purchasedCourses: [],
      cart: [],
    });
   
      router.push("/");
    
    
    closeSidebar();
  }

  function isActive(route: string) {
    return router.pathname === route ? 'text-orange-600' : 'text-black';
  }

  return (
    <>
      <div className="w-screen h-[45px] bg-gray-100 flex justify-between relative">
        <Sidebar
          bar={bar}
          userEmail={userEmail}
          sidebar={sidebar}
          logout={logout}
          closeSidebar={closeSidebar}
        />

        <Link href="/" className="font-bold text-xl p-2 ml-2 text-red-600 ">Dev Academy</Link>
        
        <div className="md:hidden flex">
        <Link href="/cart" className="md:hidden mr-10 text-lg flex justify-between items-center cursor-pointer hover:text-blue-600">
      
            <i className="fa fa-shopping-cart"></i>
         
        </Link>
        {userEmail && 
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
                <span >Cart</span>
          
            </Link>
          </li>
          <li>
            <Link href="/purchasedCourses" >
           
                <span className={`md:font-medium cursor-pointer hover:text-blue-600 ${isActive('/purchasedCourses')}`}>My Learning</span>
          
            </Link>
          </li>
        </ul>

        {userEmail ? (
      <div className="hidden md:flex font-bold text-white justify-center mr-5 gap-5">
        <p className="text-s mt-2 text-black mr-5 font-normal">{userEmail}</p>
        <button
          onClick={logout}
          className="p-1 m-1 bg-indigo-600 rounded hover:bg-indigo-800 text-white cursor-pointer"
        >
          Logout
        </button>
      </div>
    ) : (
      <div className="hidden md:flex font-bold justify-start text-white w-[170px]">
        <button
          onClick={() => router.push('/login')}
          className="p-2 mt-1 mr-2 h-max w-auto bg-indigo-600 rounded-2xl hover:bg-blue-600 text-white cursor-pointer"
        >
          Login
        </button>
        <button
          onClick={() => router.push('/signup')}
          className="p-2 mt-1 ml-2 h-max w-auto bg-indigo-600 rounded-2xl hover:bg-blue-600 text-white cursor-pointer"
        >
          Signup
        </button>
      </div>
    )}
      </div>
    </>
  );
}

export default Navbar;
