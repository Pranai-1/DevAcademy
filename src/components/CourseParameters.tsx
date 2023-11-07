import { course } from "@/pages/api/user/interface";
import CourseCard from "./CourseCard";

export default function CourseParameters({courses,type}:{courses:course[],type:string}){
    return(
        <>
        {courses.map((course:course) => (
            <CourseCard
              key={course.id}
              id={course.id}
              image={course.image}
              title={course.title}
              description={course.description}
              name={course.name}
              show={type}
              price={course.price}
            />
          ))}
          </>
    )
}