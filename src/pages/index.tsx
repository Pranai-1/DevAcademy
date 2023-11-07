import 'styled-jsx/style'


import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CourseCard from '@/components/CourseCard';
import { body, course } from './api/user/interface';
import axios from 'axios';
import auth from './api/user/auth';
import {NextApiRequest, NextApiResponse } from 'next';
import Navbar from '@/components/navBar';
import InitUser from '@/components/InitUser';
import getEmail from './api/helper/getEmail';
import allCourses from './api/helper/allCourses';
import { useEffect, useState } from 'react';
import LoadingIndicator from '@/components/LoadingIndicator';
import NoCoursesFoundMessage from '@/components/NoCoursesFoundMessage';
import CourseParameters from '@/components/CourseParameters';

interface HomeProps {
  email:string | null
}

function Home(props:HomeProps) {
  const[exploreCourses,setExploreCourses]=useState<course[]>();
  const[trendingCourses,setTrendingCourses]=useState<course[]>();
  const[loading,setLoading]=useState<boolean>(true);
  const{email}=props

  useEffect(()=>{
   const getCourses=async()=>{
    let courses:course[]=[]
    try{
     const response=await axios.get("/api/courses/all")
     courses=response.data.courses
     }catch{
   courses=[]
     }
     const explore=getRandomCourses(courses, 3)
     console.log(explore)
      setExploreCourses(explore);
      const remainingCourses = courses.filter((course: course) => !exploreCourses?.includes(course));
      setTrendingCourses(getRandomCourses(remainingCourses, 3));
      setLoading(false)
   }
getCourses();

  },[])


  return (
    <div className=" bg-black">
      <InitUser email={email}/>
      <Header />
      <div>
        <h1 className="text-2xl font-medium p-2 m-4 mb-0 ml-10 text-orange-600">Let's Explore New Launches </h1>
        <div className='w-screen flex flex-wrap justify-evenly p-2'>
        {loading ? (
            <LoadingIndicator /> 
        ) : (
          exploreCourses && exploreCourses.length > 0 ? (
          <CourseParameters courses={exploreCourses} type='all'/>
          ) : (
            <NoCoursesFoundMessage /> 
          )
        )}

        </div>
        <h1 className='text-2xl font-medium p-2 m-4 mb-0 ml-10 text-orange-600'>Trending Courses</h1>
        <div className='w-screen flex flex-wrap justify-evenly p-5'>
          {loading ? (
              <LoadingIndicator /> 
          ) : (
            trendingCourses && trendingCourses.length > 0 ? (
            <CourseParameters courses={trendingCourses} type='all'/>
            ) : (
              <NoCoursesFoundMessage /> 
            )
          )}
        </div>
      </div>
      <div className="mt-8 text-center grid gap-3 justify-center">
        <p className="md:text-lg md:text-white">
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
    let id:number | undefined,email:string | null;
    try {
      await auth(req, res);
      id = Number(req.headers["userId"]);
    } catch (error) {
      id = undefined; 
    }
    if(id){
       email = await getEmail(id)
    }else{
    email=null;
    }
    return {
      props: {
        email,
      },
    };
  }

  function getRandomCourses(courses: course[], count: number) {
    const shuffled = courses.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }


export default Home;
