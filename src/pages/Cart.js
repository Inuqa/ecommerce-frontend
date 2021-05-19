import React from 'react';
import {useSelector} from 'react-redux';
import {
  removeItem,
  selectCart,
  updateQuantity,
} from '../features/cart/cartSlice';
import {fetchMissingVariants} from '../features/variants/variantsSlice';
import {useDispatch} from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const Cart = () => {
  const [total, setTotal] = React.useState(0);
  const cart = useSelector(selectCart);
  const variants = useSelector((state) => state.variants);
  // console.log(cart);
  const dispatch = useDispatch();

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

  const handleQuantity = (e, id) => {
    dispatch(updateQuantity(({id, quantity: e.target.value})));
  };

  React.useEffect(() => {
    checkForItems();
  }, [variants]);

  React.useEffect(() => {
    let total = 0;
    if (Object.keys(variants).length !== 0) {
      console.log(variants);
      Object.entries(cart).forEach(([id, quantity]) =>
        total += variants[id].price * quantity,
      );
    }
    setTotal(total);
  }, [variants, cart]);

  const handleOnBlur = (e, id) => {
    if (e.target.value === '') {
      dispatch(updateQuantity(({id, quantity: 1})));
    } else if (+e.target.value === 0) {
      dispatch(removeItem(id));
    }
  };

  console.log(variants);
  // console.log(variants);
  // console.log(cart);
  return (
    <>
      <Row>
        <Col lg={8}>
          <Table>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th></th>
                <th>Cantidad</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(cart).map(([id, quantity]) =>
              variants[id] ?
                (<tr key={id}>
                  <td>
                    <img src={variants[id].image} alt="" />
                  </td>
                  <td>
                    <span className="ms-1">{variants[id].title}</span>
                  </td>
                  <td>{variants[id].price}</td>
                  <td><input
                    onChange={(e) => handleQuantity(e, id)}
                    onBlur={(e) => handleOnBlur(e, id)}
                    type="number" value={quantity}/></td>
                  <td>{+variants[id].price * quantity}</td>
                </tr>) :
              (<tr key={id}>
                <td></td>
                <td></td>
                <td>
                  <Spinner
                    animation="border"
                    role="loading"
                  />
                </td>
                <td></td>
                <td></td>
              </tr>),
              )}
            </tbody>
          </Table>
        </Col>
        <Col lg={4}>
          <div>
            <h3>
            Subtotal: {total}
            </h3>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Cart;
