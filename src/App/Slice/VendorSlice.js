import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../API/api";
export const fetchVendor=createAsyncThunk(
    'vendor/fetch',
    async (_, { rejectWithValue }) => {
       try{
         const response = await api.get('/vendor')
         return response.data;
       }catch(error){
         rejectWithValue(error.error)
       }
    }
)

// add vendor 
export const AddVendor=createAsyncThunk(
    'vendor/add', async(data,{rejectWithValue})=>{
        try{
            const config={
              headers: {
                  'Content-Type': 'application/json',
              },
            }
            const response= await api.post('/vendor',data,config);
            return response.data;
        }catch(error){
            rejectWithValue(error.error)
        }
    }
)
// update vendor 

export const UpdateVendor=createAsyncThunk(
    'vendor/update',async(data,{rejectWithValue})=>{
        try{
            const config={
                'Content-Type': 'application/json',
            }
            const response= await api.put('/vendor',data,config);
            return response.data;
        }
        catch(error){
            rejectWithValue(error.error)
        }
    }
)

// delete vendor
export const DeleteVendor=createAsyncThunk(
    'vendor/delete',async(id,{rejectWithValue})=>{
        try{
            const config={
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const response= await api.delete(`/vendor/${id}`,config);
            return response.data;
        }catch(error){
            rejectWithValue(error.error)
        }
    }
)



const initialState={
    // Define your initial state here
    loading:false,
    error:null,
    data:[]
}


const VendorSlice=createSlice({
    name:'vendor',
    initialState:initialState,
    reducers:{
        // Define your reducers here
    },
    extraReducers:(builder)=>{
        // Define any additional reducers or extra reducers here
        builder
        .addCase(fetchVendor.pending,(state,action)=>{
            state.loading=true         
        })
        .addCase(fetchVendor.fulfilled,(state,action)=>{
            state.loading=false;
            state.data=action.payload.vendor;
            state.error=null;  // Reset error if request is successful
        })
        .addCase(fetchVendor.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error;
        })
        // Add vendor reducer here
        .addCase(AddVendor.pending,(state,action)=>[
            state.loading=true,
            state.error=null
        ])
        .addCase(AddVendor.fulfilled,(state,action)=>{
            state.loading=false;
            state.data=action.payload.vendor || action.payload
            state.error=null;  // Reset error if request is successful
        })
        .addCase(AddVendor.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error;
        })
        .addCase(UpdateVendor.pending,(state,action)=>{
            state.loading=true
        })
        .addCase(UpdateVendor.fulfilled,(state,action)=>{
            state.loading=false;
            state.error=null;  // Reset error if request is successful
        })
        .addCase(UpdateVendor.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error;
        })
        .addCase(DeleteVendor.pending,(state,action)=>{
            state.loading=true
        })
        .addCase(DeleteVendor.fulfilled,(state,action)=>{
                    state.loading=false;
                    state.error=null;  // Reset error if request is successful
        })
        .addCase(DeleteVendor.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error;
        })
    }
})


export default VendorSlice.reducer;