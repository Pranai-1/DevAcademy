import 'styled-jsx/style'
import Header from '@/components/Base/Header';
import Footer from '@/components/Base/Footer';
import auth from './api/user/auth';
import {NextApiRequest, NextApiResponse } from 'next';
import InitUser from '@/components/InitUser';
import getEmail from './api/helper/getEmail';
import Body from '@/components/Body';
import { useContext, useEffect, useReducer } from 'react';
import { emailContext } from '@/components/EmailContextProvider';
import { CartContextProvider } from '@/components/CartContextProvider';
import { cartReducer } from '@/components/reducer';
import { setCart } from '@/features/cart/cartSlice';
import axios from 'axios';
import { useDispatch } from 'react-redux';


function Home({email}:{email:string | null}) {
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
 dispatch(setCart(cart.cartCourses)) //here we are setting cartCourses after a  login
},[cart.cartCourses.length])

 async function getCartCourses(){
    const response=await axios.get("/api/courses/cartCourses")
    const cartCourses=response.data.courses
    dispatch11({type:"CART_COURSES",payload:cartCourses})  //this is for the cartContext state with the help of this we can set the
    //initial cart courses that we set in 21  
    }

  // const{updateEmailStatus}=useContext(emailContext)
// useEffect(()=>{
//   updateEmailStatus(email)   //we have to update here as well because,in the navbar we have handled for login and logout but we
//   //didn't handle if user closes the page and comesback.
// },[email])

  return (
    <div className="h-full bg-black p-2">
      <Header />
       <Body/>
    </div>
  )
}


  // export async function getServerSideProps({ req, res }: { req: NextApiRequest; res: NextApiResponse }) {
  //   let id:number | undefined,email:string | null;
  //   try {
  //     await auth(req, res);
  //     id = Number(req.headers["userId"]);
  //   } catch (error) {
  //     id = undefined; 
  //   }
  //   if(id){
  //      email = await getEmail(id)
  //   }else{
  //   email=null;
  //   }
  //   return {
  //     props: {
  //       email,
  //     },
  //   };
  // }



export default Home;
