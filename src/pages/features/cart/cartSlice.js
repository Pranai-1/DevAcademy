import { cartContext } from "@/components/CartContextProvider";
import { createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";
import { useContext } from "react";

const initialState = {
  cartCourses:[],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart:(state, action) => {
      state.cartCourses=action.payload
    },
    addToCart: (state, action) => {
      const cartItems = state.cartCourses;
      const { id } = action.payload;
      const isPresent = cartItems.find((item) => item.id === id);
      if (!isPresent) state.cartCourses.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.cartCourses = state.cartCourses.filter(
        (course) => course.id !== action.payload
      );
    },
  },
});


export const { addToCart, removeFromCart,setCart } = cartSlice.actions;
export default cartSlice.reducer;
