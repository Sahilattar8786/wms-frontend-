import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../API/api";

export const createCustomerInvoice=createAsyncThunk(
    'customerInvoice/create',
    async ({customerId,totalAmount,paymentType,status,products,InvoiceDate}, { rejectWithValue }) => {
       try{
          const config={
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+localStorage.getItem('token')
            },
          }
          const response= await api.post('/customerInvoice',{customerId,totalAmount,paymentType,status,products,InvoiceDate},config);
          return response.data;
       }catch(error){
         rejectWithValue(error.error)
       }
    }
 
)

//get customer invoices

export const getCustomerInvoices=createAsyncThunk(
    'customerInvoice/get',
    async (_, { rejectWithValue }) => {
       const config={
         headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+localStorage.getItem('token')
            },
          }
       try{
         const response = await api.get(`/customerInvoice`,config)
         return response.data;
       }catch(error){
         rejectWithValue(error.error)
       }
    }
)

// delete invoice 

export const deleteInvoice=createAsyncThunk(
   'customerInvoice/delete',async(id,{rejectWithValue })=>{
       try{
         const config={
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+localStorage.getItem('token')
            },
          }
          const response= await api.delete(`/customerInvoice/${id}`,config)
          return response.data;
       }catch(error){
         rejectWithValue(error.error)
       }
 
   }
)





const initalState={
    data:[],
    loading:false,
    error:null
}

const CustomerInvoice=createSlice({
    name:'CustomerInvoice',
    initialState:initalState,
    reducers:{ 

    }, 
    extraReducers:(builder)=>{
       builder
       .addCase(createCustomerInvoice.pending,(state)=>{
            state.loading=true
        })
       .addCase(createCustomerInvoice.fulfilled,(state,action)=>{
            state.loading=false
        })
       .addCase(createCustomerInvoice.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })
        .addCase(getCustomerInvoices.pending,(state)=>{
           state.loading=true
        })
        .addCase(getCustomerInvoices.fulfilled,(state,action)=>{
           state.loading=false
           state.data=action.payload.invoice
        })
        .addCase(getCustomerInvoices.rejected,(state,action)=>{
           state.loading=false
           state.error=action.payload
        })
        .addCase(deleteInvoice.pending,(state)=>{
            state.loading=true
        })
        .addCase(deleteInvoice.fulfilled,(state,action)=>{
            state.loading=false
        })
        .addCase(deleteInvoice.rejected,(state,action)=>{
          state.loading=false
          state.error=action.payload.error
        })
    }
})

export default CustomerInvoice.reducer;