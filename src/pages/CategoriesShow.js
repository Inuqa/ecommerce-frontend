import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import {useParams} from 'react-router-dom';
import useCategories from '../hooks/useCategories';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Link, useLocation} from 'react-router-dom';
import Pagination from '../components/Pagination';
import AsyncSelect from 'react-select/async';

const CategoriesShow = () => {
  const [products, setProducts] = React.useState([]);
  const {name} = useParams();
  const {normalCategoriesShow} = useCategories();
  React.useEffect(() => {
    normalCategoriesShow(name)
        .then((res) => setProducts(res.data.products));
  }, [name]);

  if (products.length === 0) {
    return (
      <Spinner
        style={{position: 'absolute', top: '50%', left: '50%'}}
        className="loading-spinner"
        animation="border"
        variant="primary"
      />
    );
  }
  const renderArr = products.map((item) => (
    <Col key={item.id} xs={8} md={6} lg={3} className='m-auto'>
      <Link to={`/products/${item.id}`}>
        <div className="product-card d-flex flex-column m-1">
          <img
            className="img-fluid"
            src={item.master_image}
            alt=""
          />
          <p className='text-truncate'>{item.title}</p>
          <p>{item.price}</p>
        </div>
      </Link>
    </Col>
  ));

  return (
    <Col className='d-flex flex-wrap justify-content-between'>
      {renderArr}
    </Col>
  )
};

export default CategoriesShow;
