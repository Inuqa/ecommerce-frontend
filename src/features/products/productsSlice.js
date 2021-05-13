import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProduct = createAsyncThunk(
    'products/fetchProduct', async (id) => {
      const res = await axios.get(`http://localhost:2000/products/${id}`);
      return res.data;
    });

const initialState = {
  products: [],
  status: 'idle',
  error: null,
};

export const productsSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    saveProduct: {
    },
  },
  extraReducers: {
    [fetchProduct.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchProduct.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.products = state.products.concat(action.payload);
      state.status = 'idle';
    },
    [fetchProduct.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export default productsSlice.reducer;

export const {saveProduct} = productsSlice.actions;

export const selectProduct = (state, productId) =>
  state.product.products.find((product) => product.id === productId);

