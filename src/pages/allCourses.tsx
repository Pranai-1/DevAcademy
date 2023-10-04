
import Navbar from "@/components/navBar";
import { body, course } from "./api/user/interface";
import CourseCard from "@/components/CourseCard";
import Footer from "@/components/Footer";
import axios from "axios";
import { GetServerSideProps, NextApiRequest, NextApiResponse } from "next";
import InitUser from "@/components/InitUser";
import auth from "./api/user/auth";
import { NEXT_URL } from "@/config";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

function getRandomCourses(courses:any, count:any) {
  const shuffled = courses.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}


function AllCourses() {
  const [courses, setcourses] = useState([]);
  const [exploreCourses, setExploreCourses] = useState([]);
  const [trendingCourses, setTrendingCourses] = useState([]);
  const [email, setEmail] = useState(null);

  const router = useRouter();

  useEffect(() => {
   

    let id;
    try {
      // Replace auth logic with router check for userId (assuming it's in query or params)
      id = router.query.userId || undefined;
    } catch (error) {
      id = undefined;
    }

    const body = { id };

      // Fetch user email
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
        setcourses(coursesData)
        // Shuffle and slice courses for explore and trending sections
        const shuffledCourses = getRandomCourses(coursesData, 3);
        setExploreCourses(shuffledCourses);
        
        const remainingCourses = coursesData.filter((course:any) => !shuffledCourses.includes(course));
        const trendingShuffledCourses = getRandomCourses(remainingCourses, 3);
        setTrendingCourses(trendingShuffledCourses);
      } catch {
        setExploreCourses([]);
        setTrendingCourses([]);
        setcourses([])
      }
    }
    fetchCourses();
  }, []);

  return (
    <>
    <InitUser email={email}/>
    <Navbar/>
      {courses.length === 0 ? (
        <>
          <div className="h-screen flex justify-center items-center">
            <p className="text-2xl text-blue-600 font-bold h-max w-max">
              Courses are not available
            </p>
          </div>
          <Footer/>
        </>
      ) : (
        <div className=" bg-white w-screen">
          <p className="text-xl text-blue-600 font-bold  w-screen pt-5  flex justify-center">
            All Courses
          </p>
          <p className="hidden md:text-gray-600 md:flex justify-center font-medium p-2">
        Welcome to our extensive collection of courses. Discover a world of
        knowledge and opportunities to learn and grow.
      </p>
     
      
          <div className=" flex flex-wrap justify-center">
            {courses.map((course:course) => (
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
          <p className="text-gray-600 mb-4 flex justify-center">
        Don't hesitate to reach out if you have any questions or need guidance
        in choosing the right course for you.
      </p>
          <Footer/>
        </div>
      )}
    </>
  );
}


  export const getServerSideProps = async ({ req, res }: { req: NextApiRequest, res: NextApiResponse }) => {
    let id:string | undefined,email:string | null,courses:course[] | [];
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
      const response2 = await axios.put(`${NEXT_URL}/api/user/email`, body);
       email= response2.data.email;
    }catch{
    email=null;
    }
 
 
  try{
  const response = await axios.get(`http://localhost:3000/api/courses/all`);
  courses = response.data.courses;
  }catch{
courses=[]
  }

    
    return { props: { courses,email } };
 
};

export default AllCourses;
