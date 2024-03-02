import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getToken, useSetToken } from 'hooks/use-auth';

export const login = createAsyncThunk('auth/login', async (userData, { rejectWithValue }) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const response = await axios.post(`http://79.174.82.88/api/auth/login`, JSON.stringify(userData), config);
    const { data } = await response;

    if (data && data.error) {
      return rejectWithValue(data.error.message);
    } else {
      return data;
    }
  } catch (error) {
    if (error.response && error.response.data) {
      return rejectWithValue(error.response.data);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

export const getUsers = createAsyncThunk('auth/getUsers', async ({ rejectWithValue }) => {
  try {
    const headers = {};
    const token = getToken();
    if (token) {
      headers['Authorization'] = `Token ${token}`;
    }
    const response = await axios.get('https://79.174.82.88/api/users', {
      'Content-Type': 'application/json',
      headers
    });
    if (response.status !== 200) {
      return rejectWithValue('Invalid response from server');
    }
    const { data } = await response;
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const addUser = createAsyncThunk('auth/addUser', async (userData, { rejectWithValue }) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${getToken()}`
      }
    };
    const response = await axios.post(`http://79.174.82.88/api/user/add`, JSON.stringify(userData), config);
    if (response && response.data) {
      const { data } = response;
      return data;
    } else {
      return rejectWithValue('Invalid response from server');
    }
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const fetchUserInfo = createAsyncThunk('auth/fetchUserInfo', async (token, { rejectWithValue }) => {
  try {
    const headers = {};
    if (token) {
      headers['Authorization'] = `Token ${token}`;
    }
    const response = await axios.get('http://79.174.82.88/api/user', {
      'Content-Type': 'application/json',
      headers
    });
    if (response.status !== 200) {
      return rejectWithValue('Invalid response from server');
    }
    const { data } = await response;
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const initialState = {
  loading: false,
  user: null,
  users: [],
  token: getToken(),
  error: null,
  success: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, { payload }) => {
      console.log(payload);
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
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        loginSuccess({ payload });
        state.loading = false;
        state.user = payload.user;
        state.token = payload.token;
        useSetToken(payload.token);
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
      })
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.users = payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.users.push(payload);
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
