import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../API/api";
import { Add } from "@mui/icons-material";

export const fetchVendorInvoice = createAsyncThunk(
  "VendorInvoice/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const config={
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+localStorage.getItem('token')
        },
      }
      const response = await api.get("/vendorInvoice",config);
      return response.data;
    } catch (error) {
      rejectWithValue(error.error);
    }
  }
);

export const createVendorInvoice=createAsyncThunk(
  "VendorInvoice/create",
  async ({vendorId,totalAmount,paymentType,status,products,InvoiceDate}, { rejectWithValue }) => {
    try {
      const config={
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+localStorage.getItem('token')
        },
      }
      const response = await api.post("/vendorInvoice",{vendorId,totalAmount,paymentType,status,products,InvoiceDate},config);
      return response.data;
    } catch (error) {
      rejectWithValue(error.error);
    }
  }
)

export const deleteVendorInvoice=createAsyncThunk(
  "VendorInvoice/delete",
  async (id, { rejectWithValue }) => {
    try {
      const config={
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+localStorage.getItem('token')
        },
      }
     const response = await api.delete(`/vendorInvoice/${id}`,config);
     return response ; 
    } catch (error) {
      rejectWithValue(error.error);
    }
  }
)



const initalState = {
  data: [],
  SingleData:[],
  loading: false,
  error: null,
};

const VendorInvoiceSlice = createSlice({
  name: "VendorInvoice",
  initialState: initalState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchVendorInvoice.pending,(state)=>{
        state.loading=true
    })
    .addCase(fetchVendorInvoice.fulfilled,(state,action)=>{
       state.loading=false;
       state.data=action.payload.vendorInvoice || []
    })
    .addCase(fetchVendorInvoice.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.error
    })
    .addCase(createVendorInvoice.pending,(state)=>{
      state.loading=true
    })
    .addCase(createVendorInvoice.fulfilled,(state)=>{
       state.loading=false;
    })
    .addCase(createVendorInvoice.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.error
    })
    .addCase(deleteVendorInvoice.pending,(state)=>{
      state.loading=true
    })
    .addCase(deleteVendorInvoice.fulfilled,(state)=>{
       state.loading=false;
    })
    .addCase(deleteVendorInvoice.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.error
    })
  },
});


export default VendorInvoiceSlice.reducer;
