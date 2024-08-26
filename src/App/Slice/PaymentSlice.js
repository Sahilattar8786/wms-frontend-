import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../API/api";

export const getCustomerPayment=createAsyncThunk(
    'payment/customer/get',
    async (_, { rejectWithValue }) => {
       try{
         const config={ 
             headers: {
                'Content-Type': 'application/json',
                 'Authorization': 'Bearer '+localStorage.getItem('token')
             }
         }
         const resposne= await api.get('/payment/customer',config);
         return resposne.data;
       }catch(error){
         rejectWithValue(error.error)
       }
    }
 
)

export const getVendorPayment=createAsyncThunk(
    'payment/vendor/get',
    async (_, { rejectWithValue }) => {
       try{
         const config={ 
             headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+localStorage.getItem('token')
             }
         }
         const resposne= await api.get('/payment/vendor',config);
         return resposne.data;
       }catch(error){
         rejectWithValue(error.error)
       }
    }
)

export const createCustomerPayment=createAsyncThunk(
    'payment/customer/create',
    async({customerId, amount,date,remark},{rejectWithValue})=>{
        try{
            const config={
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer '+localStorage.getItem('token')
              },
            }
            const response= await api.post('/payment/customer',{customerId, amount,date,remark},config);
            return response.data;
        }catch(error){
            rejectWithValue(error.error)
        }
    }
)

export const createVendorPayment=createAsyncThunk(
    'payment/vendor/create',
    async({vendorId, amount,date,remark},{rejectWithValue})=>{
        try{
            const config={
              headers: {
                  'Content-Type': 'application/json',
                   'Authorization': 'Bearer '+localStorage.getItem('token')
              },
            }
            const response= await api.post('/payment/vendor',{
              vendorId, amount, date, remark}
            ,config);
            return response.data;
        }catch(error){
            rejectWithValue(error.error)
        }
    })
 const initalState={
    customerData:[],
    vendorData:[],
    loading:false,
    error:null
 }

const PaymenSlice=createSlice({
    name: 'payment',
    initialState: initalState ,
    reducers: {
     
    },
    extraReducers:(builder)=>{
        builder
       .addCase(getCustomerPayment.pending,(state,action)=>{
         state.loading=true;
       })
       .addCase(getCustomerPayment.fulfilled,(state,action)=>{
         state.loading=false;
         state.customerData=action.payload.customerPayments
       })
       .addCase(getCustomerPayment.rejected,(state,action)=>{
         state.loading=false;
         state.error=action.error
       })
       .addCase(getVendorPayment.pending,(state,action)=>{
         state.loading=true;
       })
       .addCase(getVendorPayment.fulfilled,(state,action)=>{
         state.loading=false;
         state.vendorData=action.payload.vendorPayment
       })
       .addCase(getVendorPayment.rejected,(state,action)=>{
         state.loading=false;
         state.error=action.error
       })
       .addCase(createCustomerPayment.pending,(state)=>{
         state.loading=true;
       })
       .addCase(createCustomerPayment.fulfilled,(state,action)=>{
         state.loading=false;
       })
       .addCase(createCustomerPayment.rejected,(state,action)=>{
         state.loading=false;
         state.error=action.error
       })
       .addCase(createVendorPayment.pending,(state)=>{
         state.loading=true;
       })
       .addCase(createVendorPayment.fulfilled,(state,action)=>{
         state.loading=false;
       })
       .addCase(createVendorPayment.rejected,(state,action)=>{
         state.loading=false;
         state.error=action.error
       })
    }
})

export default PaymenSlice.reducer;