import Link from "next/link";
import { useEffect, useState } from "react";
import { body, buy, card } from "@/pages/api/user/interface";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import CourseDetails from "@/components/Course/courseDetails";
import CardDetails from "@/components/Course/CardDetails";
import { failed, success } from "../../../public/toast";

export default function BuyPage() {
  const router = useRouter();
  const  id  = router.query.id as string;

  const [courseDetails, setCourseDetails] = useState<buy>({
    title: "",
    description: "",
    price: 0,
    author: ""
  });

  const [cardDetails, setCardDetails] = useState<card>({
    number: 12345678912,
    cvv: 123,
    name: "xyz"
  });

  useEffect(() => {
    if (id) 
      helper(); 
  }, [id]); 

  async function Buynow(id:string){
   const body:body={
      id
   }
  try{
    const response= await axios.post(`/api/courses/purchaseitem`,body)
    success("Course purchased Successfully")
    router.push("/purchasedCourses")
      
 }catch{
  failed("Course Already Purchased")
  router.push("/purchasedCourses")
  }
 
}
async function helper() {
  try {
    const response = await axios.get(`/api/courses/getCourse/${id}`);
   // console.log(response.data.course);
    setCourseDetails(response.data.course);
  } catch (error) {
    toast.error("Login to continue");
  
}
}

return (
  <div className="h-full w-full bg-black">
    <div className="flex flex-wrap gap-5 items-center justify-evenly p-3">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-lg w-full mt-10">
        <CourseDetails courseDetails={courseDetails}/>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md max-w-lg w-full">
        <CardDetails cardDetails={cardDetails}/>
      </div>
    </div>
    <div className=" flex justify-center gap-20 mt-5 p-3">
    <button className="font-bold bg-orange-600 rounded-xl p-2 " onClick={() => Buynow(id as string)}>
      Buynow
    </button>
    <Link href="/allCourses" className="font-bold bg-blue-600 rounded-xl p-2 ">
      Go to courses
    </Link>
    </div>
  </div>
);

}
