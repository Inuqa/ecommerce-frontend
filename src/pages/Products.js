import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import {Link, useLocation} from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import Pagination from '../components/Pagination';

const Product = () => {
  const [products, setProducts] = React.useState([]);
  const [isLoading, setIsloading] = React.useState(false);
  const [totalPages, setTotalPages] = React.useState(1);

  const queryString = useLocation().search;

  const getProducts = () => {
    setIsloading(true);
    axios.get(
        `http://localhost:2000/products${queryString ? queryString : '' }`)
        .then((res) => {
          setProducts(res.data.products);
          setTotalPages(res.data.total_count);
        })
        .then(() => setIsloading(false));
  };

  React.useEffect(() => {
    getProducts();
  }, [queryString]);

  const renderArr = products.map((item) => (
    <Col key={item.id} md={3}>
      <Link to={`/products/${item.id}`}>
        <div className="product-card">
          <img
            className="img-fluid"
            src="http://via.placeholder.com/250x250"
            alt=""
          />
          <p>{item.title}</p>
          <p>{item.price}</p>
        </div>
      </Link>
    </Col>
  ));

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
      {renderArr}
      <Pagination
        url={'/products?'}
        pages={totalPages}
      />
    </Row>
  );
};

export default Product;
