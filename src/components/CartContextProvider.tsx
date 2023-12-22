import { createContext, useContext, useEffect, useReducer } from "react"
import { cartReducer } from "./reducer"
import { toast } from "react-toastify"
import { emailContext } from "./EmailContextProvider"
import axios from "axios"
import { useDispatch } from "react-redux"
import { setCart } from "@/pages/features/cart/cartSlice"
const cartContext=createContext<any>([])
const CartContextProvider=({children}:{children:any})=>{
    const initialState={
        cartCourses:[],
        isLoading:false,
        isError:false
    }
    const[cart,dispatch11]=useReducer(cartReducer,initialState)
    const dispatch=useDispatch()
    const {state}=useContext(emailContext)
    useEffect(()=>{
        
     getCartCourses()
     dispatch(setCart(cart.cartCourses))
    },[])

    async function getCartCourses(){
        const response=await axios.get("/api/courses/cartCourses")
        const cartCourses=response.data.courses
        dispatch11({type:"CART_COURSES",payload:cartCourses})
        }
    // async function Addtocart(id:any,title: any,author: any,description: any,price: any,image: any){
      
    //     if(state.email){
    //     if(id && title && author && description && price && image){
    //         const courseDetails={
    //             id,title,author,description,price,image
    //         }
    //           dispatch({type:"ADD_TO_CART",payload:courseDetails})
    //           toast.success('Added to cart');
    //     }else{
    //         dispatch({type:"ADD_TO_CART_ERROR",payload:null})
    //         toast.error("item is already present in the cart")
    //     }
    //  }else{
    //     toast.warn("login to continue")
    //    }
    // }
    return(
        <cartContext.Provider value={{cart}}>{children}</cartContext.Provider>
    )
}



export {CartContextProvider,cartContext}