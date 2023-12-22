import { course } from "@/pages/api/user/interface";
import cartCourses from "@/pages/cart";

export function courseReducer(state: any,action: any){
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
                                ...state,isAllCoursesError:true,isLoading:false
                            }
                        }
    case "SINGLE_COURSE_LOADING":
                            return{
                                ...state,isSingleCourseLoading:true
                            }
    case "SINGLE_COURSE":
                        const singleCourse=action.payload
                        return{
                            ...state,isLoading:false,singleCourse
                        }
    case "SINGLE_COURSE_ERROR":{
                            return{
                                ...state,isSingleCourseError:true,isSingleCourseLoading:false
                            }
                        }
    default:return state
           
   }
   }

   function getRandomCourses(courses: course[], count: number) {
    const shuffled = courses.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  export function cartReducer(state: any,action: any){
    switch(action.type){
        // case "ADD_TO_CART":
        //                         const cartItems=state.cartCourses
        //                         console.log(cartItems)
        //                         const {id}=action.payload
        //                        const isPresent=cartItems.find((item:any)=>item.id==id)
        //                        if(!isPresent)
        //                         cartItems.push(action.payload)
        //                         return{
        //                             ...state,isLoading:false,cartCourses:cartItems
        //                         }
        case "CART_COURSES":
            
            return{
            ...state,isLoading:false,cartCourses:action.payload
        }
        default: return state
               
       }
  }

  export function EmailReducer(state:any,action:any){
    switch(action.type){
        case "EMAIL_LOADING":return{
                          ...state,isEmailLoading:true
        }
        case "EMAIL_VALUE":return{
            ...state,isEmailLoading:false,email:action.payload
        }
        case "EMAIL_NULL":return{
            ...state,isEmailLoading:false,email:action.payload
        }
    }
  }