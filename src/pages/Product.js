import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';
import {useParams} from 'react-router-dom';
const Product = () => {
  const [product, setProduct] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const {id} = useParams();
  React.useEffect(() => {
    axios.get(`http://localhost:2000/products/${id}`)
        .then((res) => setProduct(res.data))
        .then(() => setIsLoading(false));
  }, []);

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
        </Row>
      </Col>
    </Row>
  );
};

export default Product;
