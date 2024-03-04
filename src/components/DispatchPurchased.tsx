import {useEffect } from "react"
import axios from "axios"
import { useDispatch } from "react-redux"
import { setPurchase } from "@/features/purchased/purchaseSlice"


const DispatchPurchasedItems=()=>{
    const dispatch=useDispatch()
   
    useEffect(()=>{
        getPurchasedCourses()
    },[])

     async function getPurchasedCourses(){
        const response=await axios.get("/api/courses/purchasedCourses")
        const purchasedCourses=response.data.courses
        dispatch(setPurchase(purchasedCourses)) //here we are setting purchasedCourses after a refresh 
        }
   
    return(  
        <></>
    )
}



export {DispatchPurchasedItems}

