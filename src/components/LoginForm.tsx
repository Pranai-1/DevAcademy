import React, { useCallback, useContext, useState } from "react";
import axios from "axios";
import { z } from "zod";
import { useRouter } from "next/router";
import { emailContext } from "./EmailContextProvider";
import { failed, success } from "../../public/toast";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
const{updateEmailStatus}=useContext(emailContext)
  const router=useRouter()
  const userInput = z.object({
    email: z.string().min(11).max(40).email(),
    password: z.string().min(6).max(25),
  });

  const handleChange = useCallback((value: string, type: string) => {
    switch (type) {
      case "Email":
        setEmail(value);
        break;
      default:
        setPassword(value);
        break;
    }
  },[]);

  const handleSubmit = useCallback(async () => {
    if (email.length < 11) {
      setEmailErrorMessage("Invalid Email");
      return;
    } else {
      setEmailErrorMessage("");
    }

    if (password.length < 6) {
      setPasswordErrorMessage("Password must contain 6 characters");
      return;
    } else {
      setPasswordErrorMessage("");
    }

    const body = {
      email,
      password,
    };
    const parsedInput = userInput.safeParse(body);

    if (!parsedInput.success) {
     failed("Login failed")
    } else {
      const { email: parsedEmail, password: parsedPassword } = parsedInput.data;

      try {
       
        const response = await axios.post("/api/user/login", {
          email: parsedEmail,
          password: parsedPassword,
        });

        if (response?.status === 200) {
          router.push("/");
          updateEmailStatus(email)
          success("Login success");
          
        } else {
          updateEmailStatus(null)
          failed("Login failed")
       
        }
      } catch (error) {
        updateEmailStatus(null)
        console.log(error);
        failed("Login failed")
      }
    }
  },[email,password]);

  return (
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
      {emailErrorMessage.length > 0 && (
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
      {passwordErrorMessage.length > 0 && (
        <p className="text-red-500 text-sm">{passwordErrorMessage}*</p>
      )}

      <button
        className="p-2 font-medium text-xl bg-orange-500 rounded-xl text-white h-max pt-1 
        items-center text-center"
        onClick={handleSubmit}
      >
        Login
      </button>
    </>
  );
}
