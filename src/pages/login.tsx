import axios from "axios";
import { GetServerSideProps } from "next";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { z } from "zod";
export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>("");

  const router = useRouter();




  const userInput = z.object({
    email: z.string().min(11).max(40).email(),
    password: z.string().min(8).max(25),
  });

  const handleChange = (value: any, type: string) => {
    switch (type) {
      case "Email":
        setEmail(value);
        break;
      default:
        setPassword(value);
        break;
    }
  };

  const HandleSubmit = async () => {
    if (email.length <11) {
      setEmailErrorMessage("Invalid Email");
      return
    }else{
      setEmailErrorMessage("")
    }
    if (password.length <8) {
      setPasswordErrorMessage("Password must contain 8 characters");
      return
    }else{
      setPasswordErrorMessage("")
    }

   
      const body = {
        email,
        password,
      };
      const parsedInput = userInput.safeParse(body);
      if (!parsedInput.success) {
        toast.error("Login failed");
      } else {
        const { email: parsedEmail, password: parsedPassword } =
          parsedInput.data;
      try{
        const response = await axios.post("/api/user/login", {
          email: parsedEmail,
          password: parsedPassword,
        });
        if (response?.status == 200) {
          router.push("/");
          toast.success("Login success"); 
        } else {
          toast.error("Login failed");
        }
      }catch(error){
        console.log(error)
        toast.error("Login failed");
      }  
    }
  };
  return (
    <div className=" h-full w-full bg-slate-100 absolute flex justify-center items-center flex-wrap">
      <div className="bg-white w-[360px] md:w-[440px] flex flex-col gap-2 mb-5 p-5 rounded-xl justify-center">
        <h1 className="font-bold text-center text-2xl text-orange-600">
          Login to DevAcademy
        </h1>
        <p className="font-medium text-center text-gray-600">
          Start your journey
        </p>
        <label className="block text-gray-700 text-sm font-bold mb-2 w-full">
          Email<span className="text-red-500">*</span>
          <input
            title="Email"
            required
            placeholder="Enter Your Email"
            onChange={(e) => handleChange(e.target.value, "Email")}
            className="block w-full p-3 border rounded mt-1"
          />
        </label>
        {emailErrorMessage.length>0 && (
          <p className="text-red-500 text-sm">{emailErrorMessage}*</p>
        )}
        <label className="block text-gray-700 text-sm font-bold mb-2 w-full">
          Password<span className="text-red-500">*</span>
          <input
            title="Password"
            required
            placeholder="Enter Your Password minlength-6"
            onChange={(e) => handleChange(e.target.value, "Password")}
            className="block w-full p-3 border rounded mt-1"
          />
        </label>
        {passwordErrorMessage.length>0 && (
          <p className="text-red-500 text-sm">{passwordErrorMessage}*</p>
        )}

        <button
          className="p-2 font-medium text-xl bg-orange-500 rounded-xl text-white h-max pt-1 
       items-center  text-center"
          onClick={HandleSubmit}
        >
          Login
        </button>
        <span>
          {" "}
          New User*?
          <a href="/signup" className="text-blue-500 underline">
            Register here
          </a>
        </span>
      </div>
    </div>
  );
}

