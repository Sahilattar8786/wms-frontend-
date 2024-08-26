import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../API/api";

export const authuser = createAsyncThunk(
  'user/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await api.post('/user/login', { email, password }, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: 'User',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authuser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authuser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        // Assuming the token is returned in the action payload as action.payload.token
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(authuser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default userSlice.reducer;
