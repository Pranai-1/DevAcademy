import {useEffect } from "react"
import axios from "axios"
import { useDispatch } from "react-redux"
import { setCart } from "@/features/cart/cartSlice"


const DispatchCartItems=()=>{
    const dispatch=useDispatch()
   
    useEffect(()=>{
     getCartCourses()
    },[])

     async function getCartCourses(){
        const response=await axios.get("/api/courses/cartCourses")
        const cartCourses=response.data.courses
        dispatch(setCart(cartCourses)) //here we are setting cartCourses after a refresh 
        }
   
    return(  
        <></>
    )
}



export {DispatchCartItems}

