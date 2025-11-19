
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/auth/login', credentials);
      return response.data;
    }
    catch (error) {
      return rejectWithValue(error.response.data);
    }
})
export const registerUser=createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/auth/register', userData);
      return response.data;
    }
    catch (error) {
      return rejectWithValue(error.response.data);
    } 
})
export const logoutUser=createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/auth/logout');
     
      
      return response.data;
    }
    catch (error) {
      return rejectWithValue(error.response.data);
    }
})
export const getProfile = createAsyncThunk(
  "auth/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/auth/profile");
      return response.data;
    } catch (error) {
        console.log(error.response.data);
      return rejectWithValue(
        error.response?.data || { message: "Failed to load profile" }
      );
    }
  }
);

      