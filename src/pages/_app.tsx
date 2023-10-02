import Navbar from '@/components/navBar';
import  InitUser  from '@/components/InitUser';
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import 'tailwindcss/tailwind.css';

import '@/styles/globals.css';
import { ToastContainer } from 'react-toastify';


export default function App({ Component, pageProps,email }: AppProps & { email: string | null }) {
  console.log(email)
  return <RecoilRoot>
    
   
    <ToastContainer position="top-center" />
   
     <Component {...pageProps} />
  </RecoilRoot>;
}

