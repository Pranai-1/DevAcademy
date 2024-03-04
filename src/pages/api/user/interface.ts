export interface course {
      id:number,
      title: string;
      description: string;
      price: number;
      image: string;
      published: boolean;
      adminId: number;
      name: string;
      key?:number;
      
    }
    
    


 export interface DisplayCourse {
  id: number;
   image: string;
   title: string;
   description: string;
   name:string,
   show:string
  price:number,
  key:number

 }

 export interface body{
  id:string | undefined
 }

 export interface buy{
  title:string,
  description:string,
  price:number,
  author:string
 }
 export interface card{
  name:string,
  cvv:number,
  number:number
 
 }

 