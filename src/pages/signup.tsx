import { useRouter } from "next/router";
import { useState } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
   
  async function handleSubmit() {
    try {
      const res = await axios.post('/api/user/signup', {
        email: email,
        password: password,
      });
      const data = res.data;
      if (data.message === 'success') {
        toast.success("Signup successful");
        router.push('/login');
      } else {
        toast.error("Signup failed");
      }
    } catch (error) {
      toast.error("Signup failed");
    }
  }
  
  return (
    
    <div className="h-screen flex items-center justify-center bg-gray-150">
    <div className="bg-white p-8 rounded-md shadow-md w-96">
      <h2 className="text-2xl font-semibold text-indigo-700 mb-4">User Registration</h2>
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
        Signup
      </button>
      <p className="text-sm mt-4">
        Already Registered?{' '}
        <button
          onClick={() => {
            router.push("/login")
          }}
          className="text-indigo-700 font-semibold focus:outline-none"
        >
          Login now
        </button>
      </p>
    </div>
  </div>
  );
}

export default Signup;
