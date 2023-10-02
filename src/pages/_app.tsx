import Navbar from '@/components/navBar';
import  InitUser  from '@/components/InitUser';
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import 'tailwindcss/tailwind.css';

import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return <RecoilRoot>
   
   
     <Component {...pageProps} />
  </RecoilRoot>;
}
