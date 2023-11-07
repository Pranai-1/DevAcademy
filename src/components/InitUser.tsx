import { UserState } from "@/store/atoms/user";
import { useSetRecoilState } from "recoil";
import { useEffect } from "react"; // Import the useEffect hook

export default function InitUser({ email }: { email: string | null }) {
  const userState = useSetRecoilState(UserState);
  useEffect(() => {
    if (email != null) {
      userState({
        userEmail: email,
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
  }, []); 

  return null;
}
