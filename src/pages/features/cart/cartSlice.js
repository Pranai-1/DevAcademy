import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  cartCourses: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
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

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
