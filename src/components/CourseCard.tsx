import axios from "axios";
import { UserEmail } from "@/store/selectors/userDetails";
import { useRecoilValue } from "recoil";
import { DisplayCourse } from "../pages/api/user/interface";
import 'react-toastify/dist/ReactToastify.css';
import { NEXT_URL } from "@/config";
import Link from "next/link";
import { toast } from "react-toastify";



function CourseCard(props:DisplayCourse){
const userEmail=useRecoilValue(UserEmail)
const{id,image,title,description,name,show,price}=props


async function Addtocart(id:number){
    if(userEmail){
 const body={
    id
 }
 try{
    const response= await axios.post(`${NEXT_URL}/api/courses/addToCart`,body)
    toast.success('Added to cart');
  }catch{
    toast.error("item is already present in the cart")
}
     }else{
    toast.warn("login to continue")
   }
}
 
async function Remove(id: number) {
  if (userEmail) {
    const body = {
      id,
    };
    try {
      const response = await axios.post(`/api/courses/remove`, body);
      const elementToRemove = document.getElementById(id.toString());
      if (elementToRemove) {
        elementToRemove.remove(); 
        toast.warning('Removed from cart');
      } else {
        toast.error('Item is not present in the cart');
      }
    } catch {
      toast.error('Error occurred while removing from cart');
    }
  } else {
    toast.warn('Login to continue');
  }
}


return(
        <>
        <div id={id.toString()}  className="bg-gray-200  h-[350px] w-[300px] rounded-lg overflow-hidden shadow-md ">
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
                   <Link href={`/buy/${id}`} className="h-max w-max bg-orange-600 text-white rounded-lg m-5 p-2 hover:bg-green-800" >Buy now</Link>
                    <button className="h-max w-max bg-indigo-500 text-white rounded-lg p-2 m-5 items-center hover:bg-indigo-800" onClick={()=>{Addtocart(id)}}>Add To cart</button>
                    </div>
               }
                {show=="cart" &&
                   <div className="flex justify-evenly">
                   <Link href={`/buy/${id}`}
                     className="bg-blue-500 text-white text-sm py-2 px-4 m-4 mr-6 rounded hover:bg-blue-600 focus:outline-none"
                     
                   >
                     Buy Now
                   </Link>
                   <button onClick={()=>Remove(id)}
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