export interface course {
    _id:string,
      title: string;
      description: string;
      price: number;
      image: string;
      published: boolean;
      adminId: string;
      name: string;
    }
    
    
    export interface user extends Document{
      _id?:string,
      email: string,
      password: string,
      purchasedCourses:course[],
      cart:course[]
    }
 export const userSecretKey:string="secrectfornewusers12345"

 export interface DisplayCourse {
  id: string;
   image: string;
   title: string;
   description: string;
   name:string,
   show:string
  
 }