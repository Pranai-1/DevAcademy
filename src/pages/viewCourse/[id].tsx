import { CourseContext } from "@/components/CourseContextProvider";
import {useDispatch, useSelector} from "react-redux"
import {addToCart} from "../../features/cart/cartSlice"
import axios from "axios";
import { useParams } from "next/navigation";
import { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { emailContext } from "@/components/EmailContextProvider";
import LoadingIndicator from "@/components/LoadingIndicator";
import { failed, success, warning } from "../../../public/toast";
import { course } from "../api/user/interface";

export default function ViewCourse() {
    const { id } = useParams() || {};
    // const router=useRouter()//we can access params through router as well
    // const { param1 } = router.query;
   // console.log(param1+"param1")
    //console.log("ID:", id);
  const { courseState, getSingleCourse } = useContext(CourseContext);
const dispatch=useDispatch()
 const cart=useSelector((state:any)=>state.cart.cartCourses)
   const {emailState}=useContext(emailContext)


  useEffect(() => {
    if(id)
    getSingleCourse(`/api/courses/getCourse/${id}`);
  }, [id]);


  async function Addtocart(id:number,title: string,author: string,description: string,price: number,image: string){ 
    if(emailState.email){
        if(id && title && author && description && price && image){
            const courseDetails={
                id,title,author,description,price,image
            }
            const isPresent=cart.find((course:any)=>course.id==id)
            if(!isPresent){
              const body={
                id
              }
              try{
              const response=await axios.post("/api/courses/addToCart",body)
                  dispatch(addToCart(courseDetails));   
                success('Added to cart');
              }catch(error){
                console.log(error)
              failed("item is already present in the cart") 
              }
            }
            else{
                failed("item is already present in the cart")  
            }
        }else{
          failed("Error Occured try again") 
        }
    }else{
        warning("login to continue")
      }
}


  const obj:course= courseState.singleCourse;
  const{ name, description, price, title, image } =obj

  
  return (
    <div className="h-screen w-full bg-black text-white p-8">
      {courseState.isSingleCourseLoading ?(
       <div>
        <LoadingIndicator /> 
        </div>
      ):(
      <div className="max-w-2xl mx-auto bg-slate-100 p-4 text-blue-500 rounded-lg">
        <div className="mb-8 w-full flex justify-center items-center p-2">
          <img
            src={image} 
            alt={title}
            className="rounded-lg w-max h-auto"
          />
        </div>
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="mb-2 font-bold text-green-400">Author: {name}</p>
        <p className="text-lg mb-6">{description}</p>
        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold">&#x20B9;{price}</p>
        <button className="h-max w-max bg-indigo-500 text-white rounded-lg p-2 m-5 items-center hover:bg-indigo-800" 
        onClick={()=>{Addtocart(Number(id),title,name,description,price,image)}}>Add To cart</button> 
        </div>
      </div>

    )}
        </div>
  );
}


//In react we use <NavLink to={`/viewCourse/${id}`}></NavLink> and <Route path="/viewCourse/:id" this can be acheived by react router dom
//then we need to create viewCourse.tsx file