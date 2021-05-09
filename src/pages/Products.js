import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import Pagination from '../components/Pagination';

const Product = () => {
  const [products, setProducts] = React.useState([]);
  const [isLoading, setIsloading] = React.useState(false);
  const [offset, setOffset] = React.useState(0);
  const [totalPages, setTotalPages] = React.useState(1);

  const getProducts = () => {
    setIsloading(true);
    axios.get(`http://localhost:2000/products${offset ? `?offset=${offset}`: '' }`)
        .then((res) => {
          setProducts(res.data.products);
          setTotalPages(res.data.total_count);
        })
        .then(() => setIsloading(false));
  };

  const handlePageClick = (e) => {
    console.log(e.target);
    console.log(e.target.value);
    console.log(e.target.innerHTML);
    if (e.target.innerHTML === '&lt;') {
      console.log('asd');
      console.log(offset);
      if (offset === 0 ) {
        console.log('asdasd');
        return;
      }
      setOffset(offset - 8);
    } else if (e.target.innerHTML === '&gt;') {
      setOffset(offset + 8);
    } else {
      setOffset(Math.ceil((e.target.innerHTML - 1) * 8));
    }
  };

  React.useEffect(() => {
    getProducts();
  }, [offset]);

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
        pages={totalPages}
        handlePageClick={handlePageClick}
        offset={offset}
      />
    </Row>
  );
};

export default Product;
