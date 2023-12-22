import { CourseContext } from "@/components/AppContextProvider";
import { cartContext } from "@/components/CartContextProvider";
import {useDispatch} from "react-redux"
import {addToCart} from "../features/cart/cartSlice"
import axios from "axios";
import { useParams } from "next/navigation";
import { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { emailContext } from "@/components/EmailContextProvider";

export default function ViewCourse() {
    const { id } = useParams() || {};
    console.log("ID:", id);
  const { state, getSingleCourse } = useContext(CourseContext);
const dispatch=useDispatch()
  const {emailState}=useContext(emailContext)
  useEffect(() => {
    if(id)
    getSingleCourse(`/api/courses/getCourse/${id}`);
  }, [id]);

  async function Addtocart(id:any,title: any,author: any,description: any,price: any,image: any){ 
    if(emailState.email){
    if(id && title && author && description && price && image){
        const courseDetails={
            id,title,author,description,price,image
        }
        console.log("adding")
        dispatch(addToCart(courseDetails));   
          toast.success('Added to cart');
    }else{
        toast.error("item is already present in the cart")  //fix this functionality
    }
 }else{
    toast.warn("login to continue")
   }
}
  const { author, description, price, title, image } = state.singleCourse;

  return (
    <div className="h-screen w-full bg-black text-white p-8">
      <div className="max-w-2xl mx-auto bg-slate-100 p-4 text-blue-500 rounded-lg">
        <div className="mb-8 w-full flex justify-center items-center p-2">
          <img
            src={image} 
            alt={title}
            className="rounded-lg w-max h-auto"
          />
        </div>
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-gray-700 mb-2">By {author}</p>
        <p className="text-lg mb-6">{description}</p>
        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold">&#x20B9;{price}</p>
        <button className="h-max w-max bg-indigo-500 text-white rounded-lg p-2 m-5 items-center hover:bg-indigo-800" 
        onClick={()=>{Addtocart(id,title,author,description,price,image)}}>Add To cart</button> 
        </div>
      </div>
    </div>
  );
}
// function helper() {
//   const courseDetails={
//     id,title,author,description,price,image
// }
// let arr
//   Addtocart(id,title,author,description,price,image)
// }

//In react we use <NavLink to={`/viewCourse/${id}`}></NavLink> and <Route path="/viewCourse/:id" this can be acheived by react router dom
//then we need to create viewCourse.tsx file