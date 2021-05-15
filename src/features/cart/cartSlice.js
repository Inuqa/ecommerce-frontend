import {createSlice} from '@reduxjs/toolkit';

const initialState = {
};

export const fetchProducts = () => (dispatch, getState) => {
  const products = getState().product.products;
  dispatch(getProducts(products));
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    loadCart: (state, action) => {
      const cart = JSON.parse(localStorage.getItem('cart'));
      console.log(cart);
      if (cart) {
        console.log(cart, 'loadCart');
        Object.assign(state, cart);
      }
    },
    addItem: (state, action) => {
      let quantity = state[action.payload.productId];
      quantity = quantity ? quantity : 0;
      quantity += action.payload.quantity;
      console.log(quantity, 'addItem');
      state[action.payload.productId] = quantity;
      localStorage.setItem('cart', JSON.stringify(state));
    },
    removeItem: (state, action) => {
      delete state[action.payload.id];
    },
    getProducts: (state, action) => {
      const variants = [];
      for (let i = 0; i<action.payload.length; i++) {
        variants.push(...action.payload[i].variants);
      }
    },
  },
});

export const {addItem, removeItem, loadCart, getProducts} = cartSlice.actions;

export const selectCart = (state) => state.cart;

export default cartSlice.reducer;
