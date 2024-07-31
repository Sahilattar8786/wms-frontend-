import { configureStore, createStore } from "@reduxjs/toolkit";
import CustomerSlice from "./Slice/CustomerSlice";
import VendorSlice from "./Slice/VendorSlice";




export const store=configureStore(
    {
        reducer: {
            // Define your reducers here
            Customer:CustomerSlice,
            Vendor:VendorSlice
        },
      
    }
)