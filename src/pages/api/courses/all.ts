import { CourseModel } from '@/lib/db';
import { NextApiRequest, NextApiResponse } from 'next';
import cors from 'cors'; // Import the cors middleware
import { error } from 'console';

// Initialize the cors middleware
const corsMiddleware = cors();

export default async function GET(req: NextApiRequest, res: NextApiResponse) {

  const data=[{
    "_id":  "64ca074ab150245703ec1696",
    
    "title": "MERN Stack Course",
    "description": "MERN stack master class for beginers",
    "price": 8000,
    "image": "https://tse2.mm.bing.net/th?id=OIP.OXvjaWxrjXLb_0sxFJVBcwHaFW&pid=Api&P=0&h=180",
    "published": true,
    "adminId": "64ca04262faff4986cd95956",
    "name": "pranai"
  },
  {
    "_id" :"64ca074ab150245703ec1697",
    "title": "React Learning ",
    "description": "Learn React from Experts",
    "price": 4000,
    "image": "https://wallpapercave.com/wp/wp4923992.png",
    "published": true,
    "adminId": "64ccb6578d95dca009e3112c",
    "name": "jelly"
  },
  {
    "_id": "64ca074ab150245703ec1698",
    "title": "SQL Training",
    "description": "SQL and MYSQL Training By Dev Academy",
    "price": 2000,
    "image": "https://tse3.mm.bing.net/th?id=OIP._9She-h3lPdQbz13bfBOlgHaDt&pid=Api&P=0&h=180",
    "published": true,
   
    "adminId": "64ca04262faff4986cd95956",
    "name": "pranai"
  },
  {
    "_id": "64ca074ab150245703ec1699",
    "title": "Devops",
    "description": "Learn CI/CD pipeline and Deployment",
    "price": 4000,
    "image": "https://tse1.mm.bing.net/th?id=OIP.zmyz2g0mW9f3NiDQ8DJbegHaEK&pid=Api&P=0&h=180",
    "published": true,
   
    "adminId": "64ccb6578d95dca009e3112c",
    "name": "jelly"
  },
  {
    "_id": "64ccb6b78d95dca009e31267",
    "title": "Data Structures",
    "description": "Data Structures mastery for CP",
    "price": 2000,
    "image": "https://tse4.mm.bing.net/th?id=OIP.xlLdeW39C7DaT0oZLvSfzgHaDt&pid=Api&P=0&h=180",
    "published": true,
    "adminId": "64ccb6578d95dca009e3112c",
    "name": "jelly"
  },
  {
    "_id": "64ce66f4a7b85ca0135fcefe",
    "title": "Algorithms",
    "description": "Learn Algorithms to reduce TC ",
    "price": 4000,
    "image": "https://tse1.mm.bing.net/th?id=OIP.UnIqulEyH1LGfrfyMleivQHaC9&pid=Api&P=0&h=180",
    "published": true,
    "adminId": "64ce65778d2045a7b261578f",
    "name": "kushal"
  },
  {
    "_id": "650082ab53a3115d896ca55b",
    "title": "BlockChain",
    "description": "Master Blockchain technology",
    "price": 5000,
    "image": "https://tse4.mm.bing.net/th?id=OIP.VIaM5mVR2xp3dQ6aq3wIZgAAAA&pid=Api&P=0&h=180",
    "published": true,
    "adminId": "6500825153a3115d896ca555",
    "name": "moore",
   
  },
  {
    "_id": "6500830953a3115d896cc135" ,
    "title": "Ethereum-Working",
    "description": "Learn Ethereum and become an expert",
    "price": 4000,
    "image": "https://tse3.mm.bing.net/th?id=OIP.qph4LjBS-Es_jtUP9HEH9QHaEK&pid=Api&P=0&h=180",
    "published": true,
    "adminId": "6500825153a3115d896ca555",
    "name": "moore",
  
  },
  {
    "_id": "6500837d53a3115d896cd15e",
    "title": "AI Mastery",
    "description": "Master AI and its properties",
    "price": 8000,
    "image": "https://tse2.mm.bing.net/th?id=OIP.yfvkosWARIBUA-61hNxRPAHaFB&pid=Api&P=0&h=180",
    "published": true,
    "adminId": "6500833353a3115d896cd158",
    "name": "rohit",
    
  },
  {
    "_id": "650083b553a3115d896cd308"
    ,
    "title": "ChatGPT Guide",
    "description": "Beginers and Experts guide for Chatgpt",
    "price": 3500,
    "image": "https://tse4.mm.bing.net/th?id=OIP.4jW8tEYZY4AfCvb_9ciMowHaE8&pid=Api&P=0&h=180",
    "published": true,
    "adminId": "6500833353a3115d896cd158",
    "name": "rohit",
    
  },
  {
    "_id": "6500847a53a3115d896cd86d" ,
    "title": " NextJS Crash Course",
    "description": "Learn NextJS with Typescript",
    "price": 4000,
    "image": "https://tse3.mm.bing.net/th?id=OIP.g6uwJLsoCBZ33MAynNZJYwHaEK&pid=Api&P=0&h=180",
    "published": true,
    "adminId": "6500833353a3115d896cd158",
    "name": "rohit",
   
  }];
      return res.status(200).json({ courses: data, ok: true });
   
}
