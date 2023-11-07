export default function LoggedInUser({userEmail,logout}:{userEmail:string,logout():void}){
    return(    
<div className="hidden md:flex font-bold text-white justify-center mr-5 gap-5">
<p className="text-s mt-2 text-black mr-5 font-normal">{userEmail}</p>
<button
  onClick={logout}
  className="p-1 m-1 bg-indigo-600 rounded hover:bg-indigo-800 text-white cursor-pointer"
>
  Logout
</button>
</div>
    )
}