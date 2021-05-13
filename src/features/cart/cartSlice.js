import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      let found = false;
      const arr = state.cart.map((item) => {
        if (item.product.id === action.payload.product.id) {
          found = true;
          return {...item, quantity: item.quantity += action.payload.quantity};
        } else {
          return item;
        }
      });
      if (!found) {
        state.cart = state.cart.concat(action.payload);
      } else {
        state.cart = arr;
      }
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
