export interface course {
      id:string,
      title: string;
      description: string;
      price: number;
      image: string;
      published: boolean;
      adminId: string;
      name: string;
    }
    
    


 export interface DisplayCourse {
  id: string;
   image: string;
   title: string;
   description: string;
   name:string,
   show:string
  remove?():void,
  price:number
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