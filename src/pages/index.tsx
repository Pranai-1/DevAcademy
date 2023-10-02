

import Header from '@/pages/Header';
import Footer from '@/pages/Footer';
import CourseCard from '@/pages/CourseCard';
import { course } from './api/user/interface';
import axios from 'axios';
import { ensureDbConnected } from '@/lib/db';
import auth from './api/user/auth';
import {NextApiRequest, NextApiResponse } from 'next';
import Navbar from '@/components/navBar';
import InitUser from '@/components/InitUser';


interface HomeProps {
  exploreCourses: course[];
  trendingCourses: course[];
  email:any
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
  
  let id,email;
  try {
    await auth(req, res);
    id = req.headers["userId"];
  } catch (error) {
    console.error("Authentication error:", error);
    id = undefined; // Set id to undefined in case of an error
  }

  const body: any = {
    id
  };

 
  try{
    const response2 = await axios.put("http://localhost:3000/api/user/email", body);
     email= response2.data.email;
  }catch{
  email=null;
  }
  const response = await axios.get("http://localhost:3000/api/courses/all");
  const courses: course[] = response.data.courses;

  const exploreCourses = getRandomCourses(courses, 3);

  const remainingCourses = courses.filter((course: any) => !exploreCourses.includes(course));
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
