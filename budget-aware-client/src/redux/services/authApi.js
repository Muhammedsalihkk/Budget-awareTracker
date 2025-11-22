
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/auth/login', credentials);
      sessionStorage.setItem("accessToken",response.data.data.token)
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
      sessionStorage.removeItem("accessToken")
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
      const token = sessionStorage.getItem("accessToken");
      const response = await axiosInstance.get("/auth/profile",{
        headers: {
          Authorization: `Bearer ${token}`,
        }});
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to load profile" }
      );
    }
  }
);

      