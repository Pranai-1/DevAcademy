import SignupForm from "@/components/SignupForm";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Signup() {
  const router = useRouter();

  const handleSignupSuccess=()=>{
    toast.success("signup successful");
    router.push("/login");
  }

  const handleSignupFailure=()=>{
    toast.error("signup failed");
  }

  return (
    <div className=" h-full w-full bg-black absolute flex justify-center items-center">
      <div className="bg-white  w-[360px] md:w-[440px] flex flex-col gap-2 mb-5 p-5 rounded-xl justify-center">
        <h1 className="font-bold text-center text-2xl text-orange-600">
          Signup to BuzzBox
        </h1>
        <p className="font-medium text-center text-gray-600">
          Start your journey
        </p>
       <SignupForm
       onSignupSuccess={handleSignupSuccess}
       onSignupFailure={handleSignupFailure}
       />
      </div>
    </div>
  );
}
