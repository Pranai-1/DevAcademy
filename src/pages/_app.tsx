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
  <RecoilRoot>
    <ToastContainer />
    <Navbar/>
     <Component {...pageProps} />
     <Footer />
  </RecoilRoot>
  </CartContextProvider>
  </AppContextProvider>
  </EmailContextProvider>
  </Provider>
  )
}


