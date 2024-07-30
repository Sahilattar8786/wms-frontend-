import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../API/api";
import axios from "axios";
export const fetchCustomer=createAsyncThunk(
    'customer/fetch',
    async (_, { rejectWithValue }) => {
       try{
         const response = await axios.get('http://localhost:7000/api/customer')
         return response.data;
       }catch(error){

       }
    }
)

const initalState={
    data:[],
    loading:false,
    error:null
}

const CustomerSlice=createSlice({
    name:'Customer',
    initialState:initalState ,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
       .addCase(fetchCustomer.pending,(state,action)=>{
         state.loading=true;
         state.error=null;
       })
       .addCase(fetchCustomer.fulfilled,(state,action)=>{
         state.loading=false;
         state.data=action.payload.customer;
       })
       .addCase(fetchCustomer.rejected,(state,action)=>{
         state.loading=false;
         state.error=action.error.message;
       })
    }
})  

export default CustomerSlice.reducer;
