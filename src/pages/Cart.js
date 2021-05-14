import React from 'react';
import {useSelector} from 'react-redux';
import {
  removeItem,
  selectCart,
  getProducts,
  fetchProducts,
} from '../features/cart/cartSlice';
import {useDispatch} from 'react-redux';


const Cart = () => {
  const cart = useSelector(selectCart);
  console.log(cart);
  const dispatch = useDispatch();
  const handleRemove = (id) => {
    dispatch(removeItem(id));
  };

  dispatch(fetchProducts());

  console.log(cart);
  return (
    <div>
      {Object.entries(cart).map((item) =>
        <div key={item}>
          <h1>{`${item[0]} cantidad ${item[1]}`}</h1>
        </div>,
      )}
    </div>
  );
};

export default Cart;
