import { course } from "@/pages/api/user/interface";

export function reducer(state: any,action: any){
    console.log("HI")
   switch(action.type){
    case "ALL_COURSES_LOADING":
                            return{
                                ...state,isLoading:true
                            }
    case "ALL_COURSES":
                        const courses=action.payload
                        const newCourses=getRandomCourses(courses, 3)
                        const remainingCourses = courses.filter((course: course) => !newCourses?.includes(course));
                        const trendingCourses=getRandomCourses(remainingCourses, 3)
                    
                        return{
                            ...state,isLoading:false,allCourses:[...courses],newCourses:[...newCourses],trendingCourses:[...trendingCourses]
                        }
    case "ALL_COURSES_ERROR":{
                            return{
                                ...state,isAllCoursesError:true
                            }
                        }
    default:return state
           
   }
   }

   function getRandomCourses(courses: course[], count: number) {
    const shuffled = courses.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }