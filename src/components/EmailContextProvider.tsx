import { createContext, useReducer } from "react"
import { EmailReducer } from "./reducer"

const emailContext=createContext<any>([])
const EmailContextProvider=({children}:{children:any})=>{
    const initialState={
        isEmailLoading:false,
        email:null
    }
    const[state,dispatch]=useReducer(EmailReducer,initialState)
    const updateEmailStatus=(email:string|null)=>{
      dispatch({type:"EMAIL_LOADING"})
      if(email){
        dispatch({type:"EMAIL_VALUE",payload:email})
      }else{
        dispatch({type:"EMAIL_NULL",payload:null})
      }
    }
    return(
<emailContext.Provider value={{state,updateEmailStatus}}>{children}</emailContext.Provider>
    )
}

export {EmailContextProvider,emailContext}