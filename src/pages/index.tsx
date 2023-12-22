import 'styled-jsx/style'
import Header from '@/components/Base/Header';
import Footer from '@/components/Base/Footer';
import auth from './api/user/auth';
import {NextApiRequest, NextApiResponse } from 'next';
import InitUser from '@/components/InitUser';
import getEmail from './api/helper/getEmail';
import Body from '@/components/Body';
import { useContext, useEffect } from 'react';
import { emailContext } from '@/components/EmailContextProvider';


function Home({email}:{email:string | null}) {
  const{updateEmailStatus}=useContext(emailContext)
useEffect(()=>{
  updateEmailStatus(email)   //we have to update here as well because,in the navbar we have handled for login and logout but we
  //didn't handle if user closes the page and comesback.
},[email])

  return (
    <div className="h-full bg-black p-2">
      <Header />
       <Body/>
    </div>
  )
}


  export async function getServerSideProps({ req, res }: { req: NextApiRequest; res: NextApiResponse }) {
    let id:number | undefined,email:string | null;
    try {
      await auth(req, res);
      id = Number(req.headers["userId"]);
    } catch (error) {
      id = undefined; 
    }
    if(id){
       email = await getEmail(id)
    }else{
    email=null;
    }
    return {
      props: {
        email,
      },
    };
  }



export default Home;
