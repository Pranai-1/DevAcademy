import { CourseContext } from "@/components/AppContextProvider";
import { cartContext } from "@/components/CartContextProvider";

import axios from "axios";
import { useParams } from "next/navigation";
import { useContext, useEffect } from "react";
import { toast } from "react-toastify";

export default function ViewCourse() {
    const { id } = useParams() || {};
    console.log("ID:", id);
  const { state, getSingleCourse,email } = useContext(CourseContext);
  const{Addtocart}=useContext(cartContext)
  
  useEffect(() => {
    if(id)
    getSingleCourse(`/api/courses/getCourse/${id}`);
  }, [id]);

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


//In react we use <NavLink to={`/viewCourse/${id}`}></NavLink> and <Route path="/viewCourse/:id" this can be acheived by react router dom
//then we need to create viewCourse.tsx file