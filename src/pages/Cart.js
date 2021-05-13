import React from 'react';
import {useSelector} from 'react-redux';
import {removeItem, selectCart} from '../features/cart/cartSlice';
import {useDispatch} from 'react-redux';

const Cart = () => {
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();
  const handleRemove = (id) => {
    dispatch(removeItem(id));
  };

  console.log(cart);
  return (
    <div>
      {cart.map((item, index) => (
        <div key={index}>
          <img src={item.url} alt="" />
          <h1>{item.product.title}</h1>
          <h2>{item.product.price}</h2>
          <p>{item.quantity}</p>
          <img src={item.product.image} alt="" />
          <button onClick={() => handleRemove(index)}>remove item</button>
        </div>
      ))}
    </div>
  );
};

export default Cart;
