

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
import router from 'next/router';
import { useState, useEffect } from 'react';
//import { NEXT_URL } from '@/config';


interface HomeProps {
  exploreCourses: course[];
  trendingCourses: course[];
  email:string | null
}



function Home(props:HomeProps) {
  const [courses, setCourses] = useState<course[]>([]);

  const [email, setEmail] = useState(null);

  useEffect(() => {
    // Ensure database connection
    // async function dbConnected() {
    //   await ensureDbConnected();
    // }
    // dbConnected();

    let id;
    try {
      // Replace auth logic with router check for userId (assuming it's in query or params)
      id = router.query.userId || undefined;
    } catch (error) {
      id = undefined;
    }

    const body = { id };

   
      async function fetchUserEmail() {
        try {
          const response2 = await axios.put(`/api/user/email`, body);
          setEmail(response2.data.email);
        } catch {
          setEmail(null);
        }
      }
      fetchUserEmail();
   

    // Fetch courses
    async function fetchCourses() {
      try {
        const response = await axios.get(`/api/courses/all`);
        const coursesData = response.data.courses;
        setCourses(coursesData);
      } catch {
        setCourses([]);
      }
    }
    fetchCourses();
  }, []);
  const exploreCourses = getRandomCourses(courses, 3);

  const remainingCourses = courses.filter((course: course) => !exploreCourses.includes(course));
  const trendingCourses = getRandomCourses(remainingCourses, 3);

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
  let courses:course[]
  try{
    const response = await axios.get(`http://localhost:3000/api/courses/all`);
    courses = response.data.courses;
    }catch{
  courses=[]
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
