import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {fetchProduct} from '../products/productsSlice';

const initialState = { };

export const variantsSlice = createSlice({
  name: 'variants',
  initialState,
  reducers: {
  },
  extraReducers: {
    [fetchProduct.fulfilled]: (state, action) => {
      action.payload.variants.forEach((variant) => {
        state[variant.id] = variant;
      });
    },
  },
});

export default variantsSlice.reducer;

