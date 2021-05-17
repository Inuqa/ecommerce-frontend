import {createSlice} from '@reduxjs/toolkit';

const initialState = {
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    loadCart: (state, action) => {
      const cart = JSON.parse(localStorage.getItem('cart'));
      console.log(cart);
      if (cart) {
      //  console.log(cart, 'loadCart');
        Object.assign(state, cart);
      }
    },
    addItem: (state, action) => {
      let quantity = state[action.payload.productId];
      quantity = quantity ? quantity : 0;
      quantity += action.payload.quantity;
      //  console.log(quantity, 'addItem');
      state[action.payload.productId] = quantity;
      localStorage.setItem('cart', JSON.stringify(state));
    },
    removeItem: (state, action) => {
      delete state[action.payload.id];
    },
  },
});

export const {addItem, removeItem, loadCart, getProducts} = cartSlice.actions;

export const selectCart = (state) => state.cart;

export default cartSlice.reducer;
