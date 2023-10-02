import Link from "next/link";
import { useEffect, useState } from "react";
import { body, buy, card } from "@/pages/api/user/interface";
import axios from "axios";
import { NEXT_URL } from "@/config";
import Header from "@/components/Header";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

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
        const response = await axios.get(`${NEXT_URL}/api/courses/getCourse/${id}`);
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
    const response= await axios.post(`${NEXT_URL}/api/courses/purchaseitem`,body)
    toast.success("Course purchased Successfully")
    router.push("/purchasedCourses")
      
 }catch{
  toast.error("Course Already Purchased")
  router.push("/purchasedCourses")
  }
 
}



  return (
    <div className="h-screen w-screen bg-gray-100 ">
      <div className=" flex  items-center justify-evenly  p-3 ">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-lg w-full">
      
          <label htmlFor="title" className="block text-lg font-semibold mb-1">Title :</label>
          <input
            type="text"
            id="title"
            name="title"
            value={courseDetails.title}
            className=" mb-2 w-full p-2 border border-blue-300 rounded-lg focus:outline-none focus:border-indigo-500 text-gray-600"
            readOnly
          />
      
       
          <label htmlFor="description" className="block text-lg font-semibold mb-1">Description :</label>
          <textarea
            id="description"
            name="description"
            value={courseDetails.description}
            className="mb-2 w-full p-2 border border-blue-300 rounded-lg focus:outline-none focus:border-indigo-500 text-gray-600"
            readOnly
          />
       
      
          <label htmlFor="price" className="block text-lg font-semibold mb-1 ">Price :</label>
          <input
            type="number"
            id="price"
            name="price"
            value={courseDetails.price}
            className="mb-2 text-orange-600 w-full p-2 border border-blue-300 rounded-lg focus:outline-none focus:border-indigo-500 "
            readOnly
          />
       
       
          <label htmlFor="author" className="block text-lg font-semibold mb-1">Author :</label>
          <input
            type="text"
            id="author"
            name="author"
            value={courseDetails.author}
            className=" mb-2 w-full p-2 border border-blue-300 rounded-lg focus:outline-none focus:border-indigo-500 text-gray-600"
            readOnly
          />
        
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md max-w-lg w-full">
        <div className="mb-4">
          <label htmlFor="cardNumber" className="block text-lg font-semibold mb-1">Card Number</label>
          <input
            type="text"
            id="cardNumber"
            name="number"
            value={cardDetails.number}
            className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:border-indigo-500 text-gray-600"
            readOnly
          />
        </div>
        <div className="mb-4">
          <label htmlFor="cvv" className="block text-lg font-semibold mb-1">CVV</label>
          <input
            type="number"
            id="cvv"
            name="cvv"
            value={cardDetails.cvv}
            className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:border-indigo-500 text-gray-600"
            readOnly
          />
        </div>
        <div>
          <label htmlFor="cardName" className="block text-lg font-semibold mb-1">Name on Card</label>
          <input
            type="text"
            id="cardName"
            name="name"
            value={cardDetails.name}
            className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:border-indigo-500 text-gray-600"
            readOnly
          />
        </div>
      </div>
      </div>
   <button className="font-bold bg-orange-600 rounded-xl p-2 ml-[750px] mt-6 mb-[50px]" onClick={()=>Buynow(id as string)}>Buynow</button>
   <Link href="/allCourses" className="font-bold bg-blue-600 rounded-xl p-2 ml-[740px] " >Go to courses</Link>
    </div>
    
  );
}
