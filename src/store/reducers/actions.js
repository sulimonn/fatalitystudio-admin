import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk('auth/login', async (userData, { rejectWithValue }) => {
  try {
    // configure header's Content-Type as JSON
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const response = await axios.post(`/api/auth/login`, JSON.stringify(userData), config);
    console.log(response);
    if (response && response.data) {
      const { data } = response;
      localStorage.setItem('userToken', data.token);
      return data;
    } else {
      return rejectWithValue('Invalid response from server');
    }
  } catch (error) {
    // return custom error message from API if any
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

export const fetchUserInfo = createAsyncThunk('auth/fetchUserInfo', async (token, { rejectWithValue }) => {
  try {
    const headers = {};
    if (token) {
      headers['Authorization'] = `Token ${token}`;
    }
    const response = await fetch(`/api/user`, {
      method: 'GET',
      headers
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// initialize userToken from local storage
const token = localStorage.getItem('userToken') ? localStorage.getItem('userToken') : null;

const initialState = {
  loading: false,
  user: null,
  token,
  error: null,
  success: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('userToken');
    }
  },
  extraReducers: (builder) => {
    builder
      // login user
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        loginSuccess({ payload });
        state.loading = false;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(fetchUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserInfo.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // Add other reducers here...
  }
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
