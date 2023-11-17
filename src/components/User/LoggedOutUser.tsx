import router from "next/router";

export default function LoggedOutUser(){
    return(
    
        <div className="hidden md:flex font-bold justify-start text-white w-[170px]">
        <button
          onClick={() => router.push('/login')}
          className="p-2 mt-1 mr-2 h-max w-auto bg-indigo-600 rounded-2xl hover:bg-blue-600 text-white cursor-pointer"
        >
          Login
        </button>
        <button
          onClick={() => router.push('/signup')}
          className="p-2 mt-1 ml-2 h-max w-auto bg-indigo-600 rounded-2xl hover:bg-blue-600 text-white cursor-pointer"
        >
          Signup
        </button>
      </div>
      )
    
}