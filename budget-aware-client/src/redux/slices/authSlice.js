import { createSlice } from "@reduxjs/toolkit";
import { getProfile, loginUser, logoutUser, registerUser } from "../services/authApi";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    authUser: null,   
    profile: null,    
    error: null,
  },

  reducers: {
    clearAuth: (state) => {
      state.authUser = null;
      state.profile = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.authUser = action.payload.data; 
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.authUser = action.payload.data;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload.data;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.profile = null; 
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.authUser = null;
        state.profile = null;
      });
  },
});

export const { clearAuth } = authSlice.actions;
export default authSlice.reducer;
