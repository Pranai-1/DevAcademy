import { atom } from "recoil";

interface Course {
  title: string;
  description: string;
  price: number;
  image: string;
  published: boolean;
}

interface User {
    userEmail:string | null,
  purchasedCourses:Course[],
  cart:Course[]
}

export const UserState = atom<User>({
  key: 'UserState',
  default: {
    userEmail:null,
    purchasedCourses:[],
    cart:[]
  }
});
