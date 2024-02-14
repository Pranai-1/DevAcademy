import Navbar from '@/components/Base/navBar';
import  InitUser  from '@/components/InitUser';
import type { AppProps } from 'next/app'
import { RecoilRoot, useSetRecoilState } from 'recoil'
import 'tailwindcss/tailwind.css';
import 'styled-jsx/style'

import '@/styles/globals.css';
import { ToastContainer } from 'react-toastify';
import { UserState } from '@/store/atoms/user';
import { useEffect } from 'react';
import getEmail from './api/helper/getEmail';
import auth from './api/user/auth';
import { AppContextProvider } from '@/components/AppContextProvider';
import Footer from '@/components/Base/Footer';
import { CartContextProvider } from '@/components/CartContextProvider';
import { EmailContextProvider } from '@/components/EmailContextProvider';
import { Provider} from 'react-redux';
import store from "../redux/reduxStore"
export default function App({ Component, pageProps,email }: AppProps & { email: string | null }) {
  return (
    <Provider store={store}>
  <EmailContextProvider>
  <AppContextProvider>
    <CartContextProvider>
    <ToastContainer />
    <Navbar/>
     <Component {...pageProps} />
     <Footer />
  </CartContextProvider>
  </AppContextProvider>
  </EmailContextProvider>
  </Provider>
  )
}
//step 1:-
//create a store and then export it,wrap the store inside Provider with the whole application.
//configureStore() is the method which helps to create the store,and that is imported from @reduxjs/toolkit 
//while Provider is imported from react-redux

//step 2:-
//create the slice using createSlice() method and it is imported from @reduxjs/toolkit
//while creating the slice:-
//** pass the name of the slice as first index name:"cart"
//** initial state which is an object
//** we write reducer functions inside a reducers named key which is also an object reducers:{}
//** The methods inside reducers object will have two parameters 1.state 2.action.These methods helps to update the state
//** we need to export our actions and reducers using cartSlice.actions and cartSlice.reducer not reducers
//** state has default access so need to pass this as an argument while invoking reducer functions,we need to pass 
//** the updated state which will be accessed as action.payload
//**  dispatch(setCart(cart.cartCourses))//we pass reducer function inside which we pass updated state

//Every slice has their own reducer functions and our app has a reducer function which contains all those reducers
//In the configureStore() method pass an object with a reducer field having a value of cartReducer which has been 
//exported by cartSlice.reducer,make sure cartSlice.reducer has default export in cartSlice.js file

//we need to pass objects inside configureStore and createSlice()

//To trigger those reducer functions,we need to use useDispatch() hook which is imported from react-redux
//To access the value of the state,we need to use useSelector() hook which is imported from react-redux