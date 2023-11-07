import React, { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import axios from "axios";
import LoginForm from "@/components/LoginForm";

export default function Login() {
  const router = useRouter();

  const handleLoginSuccess = () => {
    router.push("/");
    toast.success("Login success");
  };

  const handleLoginFailure = () => {
    toast.error("Login failed");
  };

  return (
    <div className="h-full w-full bg-black absolute flex justify-center items-center flex-wrap">
      <div className="bg-white w-[360px] md:w-[440px] flex flex-col gap-2 mb-5 p-5 rounded-xl justify-center">
        <h1 className="font-bold text-center text-2xl text-orange-600">
          Login to DevAcademy
        </h1>
        <p className="font-medium text-center text-gray-600">Start your journey</p>
        <LoginForm
          onLoginSuccess={handleLoginSuccess}
          onLoginFailure={handleLoginFailure}
        />
        <span>
          New User*?
          <a href="/signup" className="text-blue-500 underline">
            Register here
          </a>
        </span>
      </div>
    </div>
  );
}
