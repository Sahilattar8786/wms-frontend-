import { configureStore, createStore } from "@reduxjs/toolkit";
import CustomerSlice from "./Slice/CustomerSlice";




export const store=configureStore(
    {
        reducer: {
            // Define your reducers here
            Customer:CustomerSlice
        },
      
    }
)