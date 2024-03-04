
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    purchasedCourses:[],
  };

export const purchaseSlice=createSlice({
  name:"purchase",
  initialState,
  reducers:{
    setPurchase:(state,action)=>{
        state.purchasedCourses=action.payload
    },
    newPurchase:(state,action)=>{
        state.purchasedCourses.push(action.payload)
    }
  }

})

export const{setPurchase,newPurchase}=purchaseSlice.actions
export default purchaseSlice.reducer