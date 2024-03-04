import 'styled-jsx/style'
import Header from '@/components/Base/Header';
import auth from './api/user/auth';
import {NextApiRequest, NextApiResponse } from 'next';
import Body from '@/components/Body';
import {  useEffect } from 'react';
import { setCart } from '@/features/cart/cartSlice';
import { useDispatch } from 'react-redux';
import getCartItems from './api/helper/getCartItems';
import { course } from './api/user/interface';
import getPurchasedItems from './api/helper/getPurchasedItems';


function Home({cartCourses,purchasedCourses}:{cartCourses:course[],purchasedCourses:course[]}) {
 const dispatch=useDispatch()
useEffect(()=>{
 dispatch(setCart(cartCourses)) //here we are setting cartCourses after a  logout and login without refresh
 //cartcontext provider will only gets executed for a refresh,this will sets the cart courses after a login and logout 
},[])
  return (
    <div className="h-full bg-black p-2">
      <Header />
       <Body/>
    </div>
  )
}

  export async function getServerSideProps({ req, res }: { req: NextApiRequest; res: NextApiResponse }) {
    let id:number | undefined
    let cartCourses:course[]=[], purchasedCourses:course[]=[];
    try {
      await auth(req, res);
      if(req.headers["userId"])
      id = Number(req.headers["userId"]);
    else
      id=undefined
    } catch (error) {
      id = undefined; 
    }
    if(id){
         cartCourses=await getCartItems(id)
         purchasedCourses=await getPurchasedItems(id)
        }
    return {
      props: {
        cartCourses,
        purchasedCourses
      },
    };
  }



export default Home;
