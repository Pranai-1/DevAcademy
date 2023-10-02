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
      purchasedCourses:[],
      cart:[]
    }


 export interface DisplayCourse {
  id: string;
   image: string;
   title: string;
   description: string;
   name:string,
   show:string
  remove?():void
 }

 export interface body{
  id:string | undefined
 }