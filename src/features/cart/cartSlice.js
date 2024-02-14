import { cartContext } from "@/components/CartContextProvider";
import { createSlice, nanoid, current } from "@reduxjs/toolkit";
import axios from "axios";
import { useContext } from "react";

const initialState = {
  cartCourses:[],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {//here it is reducers but in our configureStore it is reducer
    setCart:(state, action) => {
      //console.log(action.payload)

     //In the previous versions of redux which is vanilla redux we cannot modify the state directly
      //we used to create a new state and returning that new state like:-
      // const newState=[...state]
      // newState.cartCourses=action.payload
      // return newState

      //In newer versions we have to mutate the state ,redux uses immer tool and does all the above thing by itself
      //what immer does is it will take the original state and the new state and performs the diffing and gives the updated state
      //it is still like state is immutable only

      console.log(state)//we cannot see the state directly in output,we get an proxy object
      console.log(current(state))//we can see the state directly now
      state.cartCourses=action.payload//This and below both are same
      //return {cartCourses:action.payload}//This will also work
    },
    addToCart: (state, action) => {
      const cartItems = state.cartCourses;
      const { id } = action.payload;
      const isPresent = cartItems.find((item) => item.id === id);//check id in addtocart page itself and remove this code
      if (!isPresent) state.cartCourses.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.cartCourses = state.cartCourses.filter(
        (course) => course.id !== action.payload
      );
    },
  },
}
);


export const { addToCart, removeFromCart, setCart } = cartSlice.actions;

export default cartSlice.reducer;
