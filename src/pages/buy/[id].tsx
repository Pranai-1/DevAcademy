import Link from "next/link";
import { useEffect, useState } from "react";
import { body, buy, card } from "@/pages/api/user/interface";
import axios from "axios";
import { NEXT_URL } from "@/config";
import Header from "@/components/Header";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import CourseDetails from "@/components/courseDetails";
import CardDetails from "@/components/CardDetails";

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
    async function helper() {
      if (!id) {
        toast.error("Course ID is missing in the query parameters");
        return;
      }
      const body: body = {
        id
      };
      try {
        const response = await axios.get(`/api/courses/getCourse/${id}`);
        console.log(response.data.courses);
        setCourseDetails(response.data.courses);
      } catch (error) {
        toast.error("Login to continue");
      }
    }

    helper();
  }, [id]); 

  async function Buynow(id:string){
   const body:body={
      id
   }
  try{
    const response= await axios.post(`/api/courses/purchaseitem`,body)
    toast.success("Course purchased Successfully")
    router.push("/purchasedCourses")
      
 }catch{
  toast.error("Course Already Purchased")
  router.push("/purchasedCourses")
  }
 
}



return (
  <div className="h-screen w-screen bg-black">
    <div className="flex items-center justify-evenly p-3">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-lg w-full mt-10">
        <CourseDetails courseDetails={courseDetails}/>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md max-w-lg w-full">
        <CardDetails cardDetails={cardDetails}/>
      </div>
    </div>
    <button className="font-bold bg-orange-600 rounded-xl p-2 ml-[750px] mt-6 mb-[50px]" onClick={() => Buynow(id as string)}>
      Buynow
    </button>
    <Link href="/allCourses" className="font-bold bg-blue-600 rounded-xl p-2 ml-[740px]">
      Go to courses
    </Link>
  </div>
);

}
