import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: undefined,
};

export const authLogin = createAsyncThunk(
    'auth/login', async (userParams) => {
      const res = await axios.post(`http://localhost:2000/login`, userParams, {withCredentials: true});
      return res.data;
    },
);

export const authLogout = createAsyncThunk(
    'auth/logout', async () => {
      const res = await axios.delete(`http://localhost:2000/logout`, {withCredentials: true});
      return res.data;
    },
);

export const authAutoLogin = createAsyncThunk(
    'auth/auto_login', async () => {
      const res = await axios.get(`http://localhost:2000/current`, {withCredentials: true});
      return res.data;
    },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
  },
  extraReducers: {
    [authLogin.fulfilled]: (state, action) => {
      if (action.payload.logged_in === true) {
        state.user = action.payload.user;
      }
    },
    [authLogout.fulfilled]: (state, action) => {
      state.user = null;
    },
    [authAutoLogin.fulfilled]: (state, action) => {
      if (action.payload) {
        state.user = action.payload;
      }
    },
    [authAutoLogin.rejected]: (state, action) => {
      state.user = null;
    },
  },
});


export default authSlice.reducer;
