import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loggedIn: false,
  user: null,
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
      const res = await axios.get(`http://localhost:2000/logged_in`, {withCredentials: true});
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
        state.loggedIn = true;
        state.user = action.payload.user;
      }
    },
    [authLogout.fulfilled]: (state, action) => {
      state.loggedIn = false;
      state.user = null;
    },
    [authAutoLogin.fulfilled]: (state, action) => {
      if (action.payload.logged_in === true) {
        state.loggedIn = true;
        state.user = action.payload.user;
      }
    },
  },
});


export default authSlice.reducer;
