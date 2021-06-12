import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import {useParams} from 'react-router-dom';
import {addItem} from '../features/cart/cartSlice';
import {fetchProduct, selectProduct} from '../features/products/productsSlice';
import {useDispatch, useSelector} from 'react-redux';
import Form from 'react-bootstrap/Form';
import '../styles/product.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronUp, faChevronDown} from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';

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
    if (product && product.master_price) {
      setSelectedVariant(product.variants[0].id);
    }
  }, [product]);

  const addToCart = () => {
    dispatch(addItem({productId: selectedVariant, quantity: +quantity}));
  };

  const handleSelected = (e) => {
    setSelectedVariant(e.target.value);
  };

  const handleQuantity = (e) => {
    setQuantity(+e.target.value);
  };

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity === 1) {
      setQuantity(1);
    } else {
      setQuantity(quantity - 1);
    }
  };

  let content;

  console.log(product);

  if (productsStatus === 'loading') {
    content = <Spinner
      style={{position: 'absolute', top: '50%', left: '50%'}}
      className="loading-spinner"
      animation="border"
      variant="primary"
    />;
  } else if (product && product.discarded_at) {
    console.log(product, 'asdasd');
    content = <h1>Este producto no se encuentra disponible</h1>;
  } else if (product) {
    console.log(product);
    content =
    <Row className="mt-5">
      <Col md={6}>
        <Row>
          <img
            className="mx-auto img-fluid"
            src={product.master_image}
            alt=""
          />
        </Row>
      </Col>
      <Col md={6}>
        <h1 className="text-center">{product.title}</h1>
        <h2 className="text-center">{product.master_price}</h2>
        <Form.Control as="select" onChange={handleSelected}>
          {product.variants.map((item) => (
            <option
              key={item.id}
              value={item.id}
            >{item.size}</option>
          ))}
        </Form.Control>
        <div className="d-flex flex-column mt-2">
          <div className="product number-input mx-auto my-2">
            <button
              onClick={handleDecreaseQuantity}
              className="minus"
              type="button"
            >
              <FontAwesomeIcon icon={faChevronDown} />
            </button>
            <input
              onChange={handleQuantity}
              className="quantity"
              type="number"
              name="quantity"
              min={1}
              value={quantity}
            />
            <button
              onClick={handleIncreaseQuantity}
              className="plus"
              type="button"
            >
              <FontAwesomeIcon icon={faChevronUp} />
            </button>
          </div>
          <Button
            className="p-3"
            onClick={addToCart}>Añadir al carrito</Button>
        </div>
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
