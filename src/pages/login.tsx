import { useState } from 'react';
import {  useSetRecoilState } from 'recoil';
import { UserState } from '@/store/atoms/user';
import { useRouter } from "next/router";
import axios from 'axios';
import { toast } from 'react-toastify';
import { NEXT_URL } from '@/config';

function Login() {
  const router = useRouter();
 const userState=useSetRecoilState(UserState)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

async function handleSubmit() {
   try{
   const res=await axios.post(`${NEXT_URL}/api/user/login`, {
        email: email,
        password: password
     })

      if (res.data.message === 'success') {
        toast.success("Login successful")
          userState({
            userEmail:res.data.email,
            purchasedCourses:[],
            cart:[]

          })
          router.push("/")
         
        } else {
          toast.error("Login failed")
         
        }
      }catch(e){
        toast.error("Login failed")
      }
      };
  

  return (
    <>
      <div className="h-screen flex items-center justify-center bg-gray-150">
      <div className="bg-white p-8 rounded-md shadow-md w-96">
        <h2 className="text-2xl font-semibold text-indigo-700 mb-4">User Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-indigo-700 text-white font-medium text-lg py-2 rounded hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Login
        </button>
        <p className="text-sm mt-4">
          New User?{' '}
          <button
            onClick={() => {
              router.push("/signup")
            }}
            className="text-indigo-700 font-semibold focus:outline-none"
          >
            Signup now
          </button>
        </p>
      </div>
    </div>
    </>
  );
}

export default Login;
