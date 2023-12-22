import { createContext, useEffect, useReducer } from "react"
import { EmailReducer } from "./reducer"
import axios from "axios"

const emailContext=createContext<any>([])
const EmailContextProvider=({children}:{children:any})=>{
    const initialState={
        isEmailLoading:false,
        email:null
    }
    const[emailState,dispatch]=useReducer(EmailReducer,initialState)
    useEffect(()=>{
         getEmail()
    },[])
    async function getEmail(){
        try{
       const response=await axios.get("/api/user/email")
       const email=response.data.email
       updateEmailStatus(email)
        }catch{
            updateEmailStatus(null)
        }

    }
    const updateEmailStatus=(email:string|null)=>{
      dispatch({type:"EMAIL_LOADING"})
      if(email){
        dispatch({type:"EMAIL_VALUE",payload:email})
      }else{
        dispatch({type:"EMAIL_NULL",payload:null})
      }
    }
    return(
<emailContext.Provider value={{emailState,updateEmailStatus}}>{children}</emailContext.Provider>
    )
}

export {EmailContextProvider,emailContext}