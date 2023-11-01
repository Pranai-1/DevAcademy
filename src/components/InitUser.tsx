import { UserState } from "@/store/atoms/user";
import { useSetRecoilState } from "recoil";
import { useEffect } from "react"; // Import the useEffect hook

export default function InitUser({ email }: { email: string | null }) {
  const userState = useSetRecoilState(UserState);

  // Use useEffect to set the state after component has mounted
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
  }, []); // The empty dependency array ensures this effect runs only once after mount

  return null;
}
