import { configureStore, createStore } from "@reduxjs/toolkit";
import CustomerSlice from "./Slice/CustomerSlice";
import VendorSlice from "./Slice/VendorSlice";
import ProductSlice from "./Slice/ProductSlice";
import VendorInvoiceSlice from "./Slice/VendorInvoiceSlice";




export const store=configureStore(
    {
        reducer: {
            // Define your reducers here
            Customer:CustomerSlice,
            Vendor:VendorSlice,
            Product:ProductSlice,
            VendorInvoice:VendorInvoiceSlice
        },
      
    }
)