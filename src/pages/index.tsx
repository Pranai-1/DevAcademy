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
import getCartItems from './api/helper/getCartItems';
import { course } from './api/user/interface';


function Home({cartCourses}:{cartCourses:course[]}) {
 const dispatch=useDispatch()
useEffect(()=>{
 dispatch(setCart(cartCourses)) //here we are setting cartCourses after a  logout and login without refresh
 //cartcontext provider will only gets executed for a refresh,this will sets the cart courses after a login and logout 
},[cartCourses.length])
  return (
    <div className="h-full bg-black p-2">
      <Header />
       <Body/>
    </div>
  )
}

  export async function getServerSideProps({ req, res }: { req: NextApiRequest; res: NextApiResponse }) {
    let id:number | undefined
    let cartCourses:course[]=[];
    try {
      await auth(req, res);
      id = Number(req.headers["userId"]);
    } catch (error) {
      id = undefined; 
    }
    if(id){
         cartCourses=await getCartItems(id)
        }
    return {
      props: {
        cartCourses,
      },
    };
  }



export default Home;
