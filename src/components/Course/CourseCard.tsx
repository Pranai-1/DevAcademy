import axios from "axios";
import { DisplayCourse } from "../../pages/api/user/interface";
import Link from "next/link";
import {removeFromCart} from "../../features/cart/cartSlice"
import { useDispatch } from "react-redux";
import { useCallback, useContext } from "react";
import { emailContext } from "../EmailContextProvider";
import { failed, warning } from "../../../public/toast";
import { useRouter } from "next/router";


function CourseCard(props:DisplayCourse){
const {emailState}=useContext(emailContext)
const{id,image,title,description,name,show,price}=props
const dispatch=useDispatch()
const router=useRouter()



const remove=useCallback(async(id: number)=>{
  // console.log(id)
  if (emailState.email) {
    const body = {
      id,
    };
    try {
      const response = await axios.post(`/api/courses/remove`, body);
      //const elementToRemove = document.getElementById(id.toString());
      // if (elementToRemove) {
      //   elementToRemove.remove();
      //In React, after every dispatch action, a component will typically re-render if the state it depends on has changed. 
      //so no need to remove this manually
        dispatch(removeFromCart(id))
        warning("Removed from cart")
    } catch {
      failed("Error occurred while removing from cart")
    }
  } else {
    warning('Login to continue')
  }
},[])


return(
        <>
        <div id={id.toString()}  className="bg-gray-200  h-[350px] w-[300px] rounded-lg overflow-hidden shadow-md mt-1">
              <img className="h-[160px] w-full object-cover" src={image} alt="Course" />
              <div className="p-3 pb-0 h-[100px] m-0 border-orange-500">
                <h2 className="font-bold w-full text-xl text-blue-700">{title}</h2>
                <p className="font-medium text-xs text-gray-600 w-full h-[20px] overflow-auto m-2 ml-1">{description}</p>
                <div className="flex justify-evenly">
                <p className="font-medium text-m text-indigo-500 w-full h-[25px] overflow-auto">Author : {name}  </p>
                <p className="font-medium text-m text-red-600 w-full h-[25px] overflow-auto">Price : ₹ {price} </p>
                </div>
                </div>
                {show=="purchased" && 
                <button className="bg-blue-600 text-white text-base p-2 pl-10 pr-10 m-4 ml-[70px] rounded-lg hover:bg-green-800 focus:outline-none">
                Watch now
               </button>
                }
                {show=="all" &&
                    
                    <div className="flex justify-evenly">
                   <Link href={`/viewCourse/${id}`} className="h-max w-max bg-orange-600 text-white rounded-lg m-5 p-2 hover:bg-green-800" >View More</Link>
                   {/* <button className="h-max w-max bg-orange-600 text-white rounded-lg m-5 p-2 hover:bg-green-800" onClick={()=>{
                     router.push({
                      pathname:`/viewCourse/${id}`,
                      query: { param1: id }
                    });
                   }}>View More</button> 
                   passing params through router
                   */}
                    </div>
               }
                {show=="cart" &&
                   <div className="flex justify-evenly">
                   <Link href={`/buy/${id}`}
                     className="bg-blue-500 text-white text-sm py-2 px-4 m-4 mr-6 rounded hover:bg-blue-600 focus:outline-none"
                     
                   >
                     Buy Now
                   </Link>
                   <button onClick={()=>remove(id)}
                     className="bg-red-500 text-white text-sm py-2 px-4 m-4 ml-4 rounded hover:bg-red-600 focus:outline-none"
                   >
                     Remove
                   </button>
                </div>
            }  
            </div>
        </>
    )
}



export default CourseCard