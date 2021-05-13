import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  cart: {},
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      let quantity = state.cart[action.payload.productId];
      quantity = quantity ? quantity : 0;
      quantity += action.payload.quantity;
      state.cart[action.payload.productId] = quantity;
    },
    removeItem: (state, action) => {
      const arr = [...state.cart];
      const index = arr.findIndex((item) => item === action.payload);
      arr.splice(index, 1);
      state.cart = arr;
    },
  },
});

export const {addItem, removeItem} = cartSlice.actions;

export const selectCart = (state) => state.cart.cart;

export default cartSlice.reducer;
