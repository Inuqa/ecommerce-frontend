import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import {addItem} from '../features/cart/cartSlice';
import {useDispatch} from 'react-redux';
import Form from 'react-bootstrap/Form';

const Product = () => {
  const [product, setProduct] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [quantity, setQuantity] = React.useState(1);
  const [selectedVariant, setSelectedVariant] = React.useState({});
  const dispatch = useDispatch();
  const {id} = useParams();
  React.useEffect(() => {
    axios.get(`http://localhost:2000/products/${id}`)
        .then((res) => {
          setProduct(res.data);
          return res;
        })
        .then((res) => setSelectedVariant(res.data.variants[0]))
        .then(() => setIsLoading(false));
  }, []);

  const addToCart = () => {
    dispatch(addItem({product: {
      ...selectedVariant,
      image: product.url,
      title: product.title,
    }, quantity: +quantity}));
  };

  const handleSelected = (e) => {
    setSelectedVariant(e.target.value);
  };

  const handleQuantity = (e) => {
    setQuantity(e.target.value);
  };

  console.log(product);
  if (isLoading) {
    return <Spinner
      style={{position: 'absolute', top: '50%', left: '50%'}}
      className="loading-spinner"
      animation="border"
      variant="primary"
    />;
  }
  return (
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
                value={item}
              >{item.size}</option>
            ))}
          </Form.Control>
        </Row>
        <button onClick={addToCart}>Añadir al carrito</button>
        <input onChange={handleQuantity} value={quantity} type="number" />
      </Col>
    </Row>
  );
};

export default Product;
