import { CourseModel } from '@/lib/db'; 

import { NextApiRequest, NextApiResponse } from 'next';



export default async function GET(req: NextApiRequest, res: NextApiResponse) {

 
    // try {
      
    //   const data = await CourseModel.find({ published: true });
    //   if (data) {
        
    //     return res.status(200).json({ courses: data, message: 'success' });
    //   } else {
    //     return res.status(404).json({ message: 'Course not found' });
    //   }
    // } catch (error) {
      const data=[{
        "_id": {
          "$oid": "64ca074ab150245703ec1696"
        },
        "title": "MERN Stack Course",
        "description": "MERN stack master class for beginers",
        "price": 8000,
        "image": "https://tse2.mm.bing.net/th?id=OIP.OXvjaWxrjXLb_0sxFJVBcwHaFW&pid=Api&P=0&h=180",
        "published": true,
        "adminId": "64ca04262faff4986cd95956",
        "name": "pranai"
      },
      {
        "_id": {
          "$oid": "64ca074ab150245703ec1697"
        },
        "title": "React Learning ",
        "description": "Learn React from Experts",
        "price": 4000,
        "image": "https://wallpapercave.com/wp/wp4923992.png",
        "published": true,
        "id": {
          "$numberLong": "16903855555"
        },
        "adminId": "64ccb6578d95dca009e3112c",
        "name": "jelly"
      },
      {
        "_id": {
          "$oid": "64ca074ab150245703ec1698"
        },
        "title": "SQL Training",
        "description": "SQL and MYSQL Training By Dev Academy",
        "price": 2000,
        "image": "https://tse3.mm.bing.net/th?id=OIP._9She-h3lPdQbz13bfBOlgHaDt&pid=Api&P=0&h=180",
        "published": true,
        "id": {
          "$numberLong": "1690385242000"
        },
        "adminId": "64ca04262faff4986cd95956",
        "name": "pranai"
      },
      {
        "_id": {
          "$oid": "64ca074ab150245703ec1699"
        },
        "title": "Devops",
        "description": "Learn CI/CD pipeline and Deployment",
        "price": "4000",
        "image": "https://tse1.mm.bing.net/th?id=OIP.zmyz2g0mW9f3NiDQ8DJbegHaEK&pid=Api&P=0&h=180",
        "published": "true",
        "id": {
          "$numberLong": "1690385242944"
        },
        "adminId": "64ccb6578d95dca009e3112c",
        "name": "jelly"
      },
      {
        "_id": {
          "$oid": "64ca074ab150245703ec169a"
        },
        "title": "Machine Learning ",
        "description": "Learn Machine Learning by experts",
        "price": 5000,
        "image": "https://tse2.mm.bing.net/th?id=OIP.9HBOCu4XOgGD0RS5mPbMLgHaFP&pid=Api&P=0&h=180",
        "published": true,
        "id": {
          "$numberLong": "1690389160597"
        },
        "adminId": "64cc901909f2c555188fd50b",
        "name": "john"
      },
      {
        "_id": {
          "$oid": "64ca074ab150245703ec169b"
        },
        "title": "Web 3",
        "description": "Master class on WEB 3 and Blockchain",
        "price": "5000",
        "image": "https://tse4.mm.bing.net/th?id=OIP.d5SdU8hf1FsFTEhoEUAjPQHaEJ&pid=Api&P=0&h=180",
        "published": "true",
        "id": {
          "$numberLong": "1690442020277"
        },
        "adminId": "64cc901909f2c555188fd50b",
        "name": "john"
      },
      {
        "_id": {
          "$oid": "64ca074ab150245703ec169c"
        },
        "title": "Artificial Intelligence ",
        "description": "Artificial Intelligence Crash Course by experts in the industry",
        "price": "7500",
        "image": "https://tse2.mm.bing.net/th?id=OIP.rm9p-WaBaJWY0lwZ-y9rjAHaE8&pid=Api&P=0&h=180",
        "published": "true",
        "id": {
          "$numberLong": "1690442150376"
        },
        "adminId": "64cc901909f2c555188fd50b",
        "name": "john"
      },
      {
        "_id": {
          "$oid": "64ccb6b78d95dca009e31267"
        },
        "title": "Data Structures",
        "description": "Data Structures mastery for CP",
        "price": 2000,
        "image": "https://tse4.mm.bing.net/th?id=OIP.xlLdeW39C7DaT0oZLvSfzgHaDt&pid=Api&P=0&h=180",
        "published": true,
        "adminId": "64ccb6578d95dca009e3112c",
        "__v": 0,
        "name": "jelly"
      },
      {
        "_id": {
          "$oid": "64ce66f4a7b85ca0135fcefe"
        },
        "title": "Algorithms",
        "description": "Learn Algorithms to reduce TC ",
        "price": 4000,
        "image": "https://tse1.mm.bing.net/th?id=OIP.UnIqulEyH1LGfrfyMleivQHaC9&pid=Api&P=0&h=180",
        "published": true,
        "adminId": "64ce65778d2045a7b261578f",
        "name": "kushal",
        "__v": 0
      },
      {
        "_id": {
          "$oid": "650082ab53a3115d896ca55b"
        },
        "title": "BlockChain",
        "description": "Master Blockchain technology",
        "price": 5000,
        "image": "https://tse4.mm.bing.net/th?id=OIP.VIaM5mVR2xp3dQ6aq3wIZgAAAA&pid=Api&P=0&h=180",
        "published": true,
        "adminId": "6500825153a3115d896ca555",
        "name": "moore",
        "__v": 0
      },
      {
        "_id": {
          "$oid": "6500830953a3115d896cc135"
        },
        "title": "Ethereum-Working",
        "description": "Learn Ethereum and become an expert",
        "price": 4000,
        "image": "https://tse3.mm.bing.net/th?id=OIP.qph4LjBS-Es_jtUP9HEH9QHaEK&pid=Api&P=0&h=180",
        "published": true,
        "adminId": "6500825153a3115d896ca555",
        "name": "moore",
        "__v": 0
      },
      {
        "_id": {
          "$oid": "6500837d53a3115d896cd15e"
        },
        "title": "AI Mastery",
        "description": "Master AI and its properties",
        "price": 8000,
        "image": "https://tse2.mm.bing.net/th?id=OIP.yfvkosWARIBUA-61hNxRPAHaFB&pid=Api&P=0&h=180",
        "published": true,
        "adminId": "6500833353a3115d896cd158",
        "name": "rohit",
        "__v": 0
      },
      {
        "_id": {
          "$oid": "650083b553a3115d896cd308"
        },
        "title": "ChatGPT Guide",
        "description": "Beginers and Experts guide for Chatgpt",
        "price": 3500,
        "image": "https://tse4.mm.bing.net/th?id=OIP.4jW8tEYZY4AfCvb_9ciMowHaE8&pid=Api&P=0&h=180",
        "published": true,
        "adminId": "6500833353a3115d896cd158",
        "name": "rohit",
        "__v": 0
      },
      {
        "_id": {
          "$oid": "6500847a53a3115d896cd86d"
        },
        "title": " NextJS Crash Course",
        "description": "Learn NextJS with Typescript",
        "price": 4000,
        "image": "https://tse3.mm.bing.net/th?id=OIP.g6uwJLsoCBZ33MAynNZJYwHaEK&pid=Api&P=0&h=180",
        "published": true,
        "adminId": "6500833353a3115d896cd158",
        "name": "rohit",
        "__v": 0
      }]

      return res.status(200).json({ courses: data, message: 'success' });
   // }
  
}
