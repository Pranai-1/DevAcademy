import axios from "axios";
import  { useRouter } from "next/router";
import { useCallback, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { failed, success, warning } from "../../public/toast";



export default function SignupForm(){

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [emailErrorMessage, setEmailErrorMessage] = useState<string>("");
    const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>("");
    const router = useRouter();
    const[captcha,setCaptcha]=useState<string|null>();
    const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  
    const handleChange = useCallback((value: string, type: string) => {
      switch (type) {     
        case "Email":
          setEmail(value);
          break;
        case "Password":
          setPassword(value);
          break;
        default:
          break;
      }
      },[]);
  
    const HandleSubmit = useCallback(async () => {
      if (email.length <11) {
        setEmailErrorMessage("Invalid Email");
        return
      }else{
        setEmailErrorMessage("")
      }
      if (password.length <6) {
        setPasswordErrorMessage("Password must contain 6 characters");
        return
      } else{
        setPasswordErrorMessage("")
      }
 
      if(!captcha)
      {
       warning("captcha failed")
        return
      }

        const body = {
          email,
          password,
        };
        try {
          const response = await axios.post("/api/user/signup", body);
         success("signup successful!")
        router.push("/login");
        } catch {
          failed("signup failed")
        }
    },[email,password,captcha]);//we need to re-create the function to get updated email and password and captcha

    return(
        <>
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
          <p className="text-red-500 text-sm">{emailErrorMessage}</p>
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
          <p className="text-red-500 text-sm">{passwordErrorMessage}</p>
        )}
        <ReCAPTCHA sitekey={RECAPTCHA_SITE_KEY!} onChange={setCaptcha} className="mx-1"/>
        <button
          className="p-2 font-medium text-xl bg-orange-500 rounded-xl text-white h-max pt-1 
       items-center  text-center"
          onClick={HandleSubmit}
        >
          Signup
        </button>
        <span>
          {" "}
          Already Registered*?
          <a href="/login" className="text-blue-500 underline">
            Login Now
          </a>
        </span>
        </>
    )
}