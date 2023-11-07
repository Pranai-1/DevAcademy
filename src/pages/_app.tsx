import Navbar from '@/components/navBar';
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


export default function App({ Component, pageProps,email }: AppProps & { email: string | null }) {
  return <RecoilRoot>
    <ToastContainer />
    <Navbar/>
     <Component {...pageProps} />
  </RecoilRoot>;
}


