

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CourseCard from '@/components/CourseCard';
import { body, course } from './api/user/interface';
import axios from 'axios';
import { ensureDbConnected } from '@/lib/db';
import auth from './api/user/auth';
import {NextApiRequest, NextApiResponse } from 'next';
import Navbar from '@/components/navBar';
import InitUser from '@/components/InitUser';
//import { NEXT_URL } from '@/config';


interface HomeProps {
  exploreCourses: course[];
  trendingCourses: course[];
  email:string | null
}

function Home(props:HomeProps) {
  const{ exploreCourses,trendingCourses,email}=props
  return (
    <div className="bg-white">
      <InitUser email={email}/>
      <Navbar/>
      <Header />
      <div>
        <h1 className="text-2xl font-medium p-2 m-4 mb-0 ml-10 text-orange-600">Let's Explore New Launches </h1>
        <div className='w-screen flex flex-wrap justify-evenly p-2'>
          {exploreCourses.map((course) => (
            <CourseCard
              id={course._id}
              image={course.image}
              title={course.title}
              description={course.description}
              name={course.name}
              show="all"
              price={course.price} 
            />
          ))}
        </div>
        <h1 className='text-2xl font-medium p-2 m-4 mb-0 ml-10 text-orange-600'>Trending Courses</h1>
        <div className='w-screen flex flex-wrap justify-evenly p-5'>
          {trendingCourses.map((course) => (
            <CourseCard 
              id={course._id}
              image={course.image}
              title={course.title}
              description={course.description}
              name={course.name}
              show="all"
              price={course.price} 
            />
          ))}
        </div>
      </div>
      <div className="mt-8 text-center grid gap-3 justify-center">
        <p className="md:text-lg md:text-gray-600">
          Discover a world of learning opportunities with Dev Academy.
        </p>
        <a
          href="/user/courses/all"
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-full w-max text-center ml-36 mb-4 hover:bg-blue-600 transition duration-300"
        >
          Explore Courses
        </a>
      </div>
      <Footer />
    </div>
  );
}


export async function getServerSideProps({ req, res }: { req: NextApiRequest; res: NextApiResponse }) {
 await ensureDbConnected();
  
  let id:string | undefined,email:string | null;
  try {
    await auth(req, res);
 
    id = req.headers["userId"] as string;
  } catch (error) {
 
    id = undefined; 
  }
const body: body = {
    id
  };
 
  try{
    const response2 = await axios.put(`http://localhost:3000/api/user/email`, body);
     email= response2.data.email;
  }catch{
  email=null;
  }
  let courses: course[]
  try {
    const response = await fetch(`http://localhost:3000/api/courses/all`);
    if (response.ok) {
      const data = await response.json();
      courses = data.courses;
    } else {
      courses = [];
    }
  } catch (error) {
     courses=[{
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
  }

  const exploreCourses = getRandomCourses(courses, 3);

  const remainingCourses = courses.filter((course: course) => !exploreCourses.includes(course));
  const trendingCourses = getRandomCourses(remainingCourses, 3);

  return {
    props: {
      exploreCourses,
      trendingCourses,
      email,
    },
  };
}

function getRandomCourses(courses: course[], count: number) {
  const shuffled = courses.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}


export default Home;
