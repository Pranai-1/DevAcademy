
import Navbar from "@/components/navBar";
import { course } from "./api/user/interface";
import CourseCard from "@/pages/CourseCard";
import Footer from "@/pages/Footer";
import axios from "axios";
import { GetServerSideProps, NextApiRequest, NextApiResponse } from "next";
import InitUser from "@/components/InitUser";
import auth from "./api/user/auth";




function AllCourses({courses,email}:{courses:course[],email:any}) {


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
            {courses.map((course:any) => (
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
    let id,email,courses;
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
    courses = response.data.courses;
  
    
    return { props: { courses,email } };
 
};

export default AllCourses;
