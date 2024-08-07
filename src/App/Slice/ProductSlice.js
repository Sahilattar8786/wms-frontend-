import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../API/api";

export const fetchProduct=createAsyncThunk(
    'product/fetch',
    async (_, { rejectWithValue }) => {
       try{
         const response = await api.get('/product')
         return response.data;
       }catch(error){
         rejectWithValue(error.error)
       }
    }
 
)

//add product 

export const addProduct=createAsyncThunk(
    'product/add',async(data,{rejectWithValue})=>{
        try{
          const config={
            headers: {
              'Content-Type': 'application/json',
            },
          }
          const response=await api.post('/product',data,config)
          return response.data;
        }catch(error){
          rejectWithValue(error.error)
        }
    }
)

//update product 
export const UpdateProduct=createAsyncThunk(
    'product/update',async(data,{rejectWithValue})=>{
        try{
          const config={
            headers: {
              'Content-Type': 'application/json',
            },
          }
          const response=await api.put(`/product/${data._id}`,data,config)
          return response.data;
        }catch(error){
          rejectWithValue(error.error)
        }
    }
)

//delete product

export const DeleteProduct=createAsyncThunk(
    'product/delete',async(id,{rejectWithValue})=>{
        try{
          const config={
            headers: {
              'Content-Type': 'application/json',
            },
          }
          const response=await api.delete(`/product/${id}`,config)
          return response.data;
        }catch(error){
          rejectWithValue(error.error)
        }
    }
)


const initialState={
    // Define your initial state here
    data:[],
    loading:false,
    error:null,
}

const ProductSlice=createSlice({
    name:'Product',
    initialState: initialState ,
    reducers:{

    },
    extraReducers:(builder)=>{
        // Define any additional reducers or extra reducers here
        builder
       .addCase(fetchProduct.pending,(state,action)=>{
         state.loading=true;
         state.error=null;
       })
       .addCase(fetchProduct.fulfilled,(state,action)=>{
          state.loading=false ;
          state.data=action.payload.product ;
       })
       .addCase(fetchProduct.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.error;
       })
       .addCase(addProduct.pending,(state,action)=>{
          state.loading=true;
          state.error=null;
       })
       .addCase(addProduct.fulfilled,(state,action)=>{
          state.loading=false;
       })
       .addCase(addProduct.rejected,(state,action)=>{
          state.loading=false;
          state.error=action.error;
       })
       .addCase(UpdateProduct.pending,(state,action)=>{
          state.loading=true;
          state.error=null;
       })
       .addCase(UpdateProduct.fulfilled,(state,action)=>{
          state.loading=false;
       })
       .addCase(UpdateProduct.rejected,(state,action)=>{
          state.loading=false;
          state.error=action.error;
       })
       .addCase(DeleteProduct.pending,(state,action)=>{
          state.loading=true;
          state.error=null;
       })
       .addCase(DeleteProduct.fulfilled,(state,action)=>{
          state.loading=false;
       })
       .addCase(DeleteProduct.rejected,(state,action)=>{
          state.loading=false;
          state.error=action.error;
       })
    }

})

export default ProductSlice.reducer;