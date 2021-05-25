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
      console.log('asd');
      const res = await axios.delete(`http://localhost:2000/logout`, {withCredentials: true});
      console.log(res);
    },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
  },
  extraReducers: {
    [authLogin.fulfilled]: (state, action) => {
      console.log(action);
      if (action.payload.logged_in === true) {
        state.loggedIn = true;
        state.user = action.payload.user
      }
    },
  },
});


export default authSlice.reducer;
