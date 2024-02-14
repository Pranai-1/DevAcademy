import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";//This is a default import so,naming can be anything

//If we have a single slice
//  const store=configureStore({
//     reducer:cartReducer,
// })



//If we have multiple slices
const store=configureStore({
    reducer:{//here it is reducer,1 big reducer containing multiple small reducers
       cart:cartReducer,
    //    user:userReducer
    }
})

export default store