import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../API/api";
import axios from "axios";
import { Update } from "@mui/icons-material";
export const fetchCustomer=createAsyncThunk(
    'customer/fetch',
    async (_, { rejectWithValue }) => {
       try{
         const response = await api.get('/customer')
         return response.data;
       }catch(error){
         rejectWithValue(error.error)
       }
    }
)

export const addCustomer=createAsyncThunk(
  'customer/add',async(data,{rejectWithValue})=>{
    try{
      const config={
        headers: {
          'Content-Type': 'application/json',
        },
      }
    console.log(data)
      const response= await api.post('/customer',data,config);
      return response.data;

    }catch(error){
      rejectWithValue(error.error)
    }
  })

 export const UpdateCustomer=createAsyncThunk(
  'customer/update',async(data,{rejectWithValue})=>{
    try{
      const config={
        headers: {
          'Content-Type': 'application/json',
        },
      }
      console.log(data)
      const response= await api.put(`/customer/${data._id}`,data,config);
      return response.data;
    }
     catch(error){
       rejectWithValue(error.msg)
     } 
    }
 ) 

 export const deleteCustomer=createAsyncThunk(
  'customer/delete',async(id,{rejectWithValue})=>{
    try{
      const config={
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const response= await api.delete(`/customer/${id}`,config);
      return response.data;
    }
     catch(error){
       rejectWithValue(error.msg)
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
         state.data=action.payload.customer || action.payload;
       })
       .addCase(fetchCustomer.rejected,(state,action)=>{
         state.loading=false;
         state.error=action.error.msg;
       })
       .addCase(addCustomer.pending,(state,action)=>{
         state.loading=true;
         state.error=null;
       })
       .addCase(addCustomer.fulfilled,(state,action)=>{
         state.loading=false;
         state.error=null ;

       })
       .addCase(addCustomer.rejected,(state,action)=>{
         state.loading=false;
         state.error=action.error.msg;
       })
       .addCase(UpdateCustomer.pending,(state,action)=>{
         state.loading=true;
         state.error=null;
       })
       .addCase(UpdateCustomer.fulfilled,(state,action)=>{
         state.loading=false;
         state.error=null ;
        })
        .addCase(UpdateCustomer.rejected,(state,action)=>{
          state.loading=false;
          state.error=action.error.msg;
        })
        .addCase(deleteCustomer.pending,(state,action)=>{
          state.loading=true;
          state.error=null;
        })
        .addCase(deleteCustomer.fulfilled,(state,action)=>{
          state.loading=false;
          state.error=null ;
        })
        .addCase(deleteCustomer.rejected,(state,action)=>{
          state.loading=false;
          state.error=action.error.msg;
        })
    }
})  

export default CustomerSlice.reducer;
