import Navbar from '@/components/navBar';
import  InitUser  from '@/components/InitUser';
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import 'tailwindcss/tailwind.css';
import 'styled-jsx/style'

import '@/styles/globals.css';
import { ToastContainer } from 'react-toastify';


export default function App({ Component, pageProps,email }: AppProps & { email: string | null }) {

  return <RecoilRoot>
    <ToastContainer />
     <Component {...pageProps} />
  </RecoilRoot>;
}

