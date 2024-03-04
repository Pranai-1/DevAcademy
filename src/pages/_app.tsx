import Navbar from '@/components/Base/navBar';
import type { AppProps } from 'next/app'
import 'tailwindcss/tailwind.css';
import 'styled-jsx/style'
import '@/styles/globals.css';
import { ToastContainer } from 'react-toastify';
import { CourseContextProvider } from '@/components/CourseContextProvider';
import Footer from '@/components/Base/Footer';
import { DispatchCartItems } from '@/components/DispatchCartItems';
import { EmailContextProvider } from '@/components/EmailContextProvider';
import { Provider} from 'react-redux';
import store from "../redux/reduxStore"
import { DispatchPurchasedItems } from '@/components/DispatchPurchased';


export default function App({ Component, pageProps }: AppProps) {
  return (
   
    <Provider store={store}>
  <EmailContextProvider>
  <CourseContextProvider>
    <DispatchCartItems/>
    <DispatchPurchasedItems/>
    <ToastContainer bodyClassName={" p-2 m-2"}/>
    <Navbar/>
     <Component {...pageProps} />
     <Footer />
  </CourseContextProvider>
  </EmailContextProvider>
  </Provider>

  )
}
