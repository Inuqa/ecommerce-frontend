import React from 'react';
import {useSelector} from 'react-redux';
import {
  removeItem,
  selectCart,
} from '../features/cart/cartSlice';
import {fetchMissingVariants} from '../features/variants/variantsSlice';
import {useDispatch} from 'react-redux';


const Cart = () => {
  const cart = useSelector(selectCart);
  const variants = useSelector((state) => state.variants);
  // console.log(cart);
  const dispatch = useDispatch();
  const handleRemove = (id) => {
    dispatch(removeItem(id));
  };

  const checkForItems = () => {
    const missingIds = [];
    Object.entries(cart).forEach(([id, _]) => {
      if (variants[id] === undefined) {
        missingIds.push(id);
      }
    });
    if (missingIds.length) {
      dispatch(fetchMissingVariants(missingIds));
    }
  };

  React.useEffect(() => {
    checkForItems();
  }, [variants]);

  // console.log(variants);
  // console.log(cart);
  return (
    <div>
      {Object.entries(cart).map(([id, quantity]) =>
        <div key={id}>
          {variants[id] ? variants[id].title : 'no esta'}
          <h1>{`${id} cantidad ${quantity}`}</h1>
        </div>,
      )}
    </div>
  );
};

export default Cart;
