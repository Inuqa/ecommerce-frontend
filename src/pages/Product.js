import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import {useParams} from 'react-router-dom';
import {addItem} from '../features/cart/cartSlice';
import {fetchProduct, selectProduct} from '../features/products/productsSlice';
import {useDispatch, useSelector} from 'react-redux';
import Form from 'react-bootstrap/Form';

const Product = () => {
  const [quantity, setQuantity] = React.useState(1);
  const [selectedVariant, setSelectedVariant] = React.useState();
  const dispatch = useDispatch();
  const {id} = useParams();

  const product = useSelector((state) => selectProduct(state, +id));
  const productsStatus = useSelector((state) => state.product.status);
  React.useEffect(() => {
    if (!product) {
      dispatch(fetchProduct(id));
    }
  }, []);

  React.useEffect(() => {
    if (product) setSelectedVariant(product.variants[0].id);
  }, [product]);

  console.log(selectedVariant);
  const addToCart = () => {
    dispatch(addItem({productId: selectedVariant, quantity: +quantity}));
  };

  const handleSelected = (e) => {
    setSelectedVariant(e.target.value);
  };

  const handleQuantity = (e) => {
    setQuantity(e.target.value);
  };

  let content;

  if (productsStatus === 'loading') {
    content = <Spinner
      style={{position: 'absolute', top: '50%', left: '50%'}}
      className="loading-spinner"
      animation="border"
      variant="primary"
    />;
  } else if (product) {
    console.log(product);
    content =
    <Row className="mt-5">
      <Col md={6}>
        <Row>
          <Col className="d-flex">
            <img className="mx-auto img-fluid" src={`http://via.placeholder.com/500x500`} alt="" />
          </Col>
        </Row>
      </Col>
      <Col md={6}>
        <Row>
          <h1 className="text-center">{product.title}</h1>
        </Row>
        <Row>
          <h2 className="text-center">{product.master_price}</h2>
          <Form.Control as="select" onChange={handleSelected}>
            {product.variants.map((item) => (
              <option
                key={item.id}
                value={item.id}
              >{item.size}</option>
            ))}
          </Form.Control>
        </Row>
        <button onClick={addToCart}>Añadir al carrito</button>
        <input onChange={handleQuantity} value={quantity} type="number" />
      </Col>
    </Row>;
  }

  return (
    <>
      {content}
    </>
  );
};

export default Product;
