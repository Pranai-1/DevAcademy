
import { UserState } from "@/store/atoms/user";

import { NextApiRequest, NextApiResponse } from "next";
import { useSetRecoilState } from "recoil";



export default  function InitUser({email}:{email:string | null}) {
  const userState = useSetRecoilState(UserState);
if (email!=null) {
        userState({
          userEmail:email,
          purchasedCourses: [],
          cart: [],
        });
      } else {
        userState({
          userEmail: null,
          purchasedCourses: [],
          cart: [],
        });
      }
   return null;
} 
   