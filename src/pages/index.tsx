import 'styled-jsx/style'
import Header from '@/components/Base/Header';
import Footer from '@/components/Base/Footer';
import auth from './api/user/auth';
import {NextApiRequest, NextApiResponse } from 'next';
import InitUser from '@/components/InitUser';
import getEmail from './api/helper/getEmail';
import Body from '@/components/Body';


function Home({email}:{email:string | null}) {


  return (
    <div className=" bg-black">
      <InitUser email={email}/>
      <Header />
       <Body/>
      <Footer />
    </div>
  );
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
