import SignupForm from "@/components/SignupForm";
import { NextApiRequest, NextApiResponse } from "next";

import auth from "./api/user/auth";


export default function Signup() {


  return (
    <div className=" h-full w-full bg-black absolute flex justify-center items-center">
      <div className="bg-white  w-[360px] md:w-[440px] flex flex-col gap-2 mb-5 p-5 rounded-xl justify-center">
        <h1 className="font-bold text-center text-2xl text-orange-600">
          Signup to BuzzBox
        </h1>
        <p className="font-medium text-center text-gray-600">
          Start your journey
        </p>
       <SignupForm/>
      </div>
    </div>
  );
}

export async function getServerSideProps({req,res}:{req:NextApiRequest,res:NextApiResponse}){
  let id:number | undefined,email:string | null
  try {
    await auth(req, res);
    id =Number(req.headers["userId"]);
  } catch (error) {
    id = undefined; 
  }

  if(id){
  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
 } return {
  props: {},
};
   
  }

  // This indicates that the redirect is temporary. In HTTP terms, this corresponds to a 302 status code. It tells the 
  // browser or client that the redirect is temporary and that it should continue to use the original URL for future requests. 
  //if you set redirect to true the browser directly visits the destination for every request to signup