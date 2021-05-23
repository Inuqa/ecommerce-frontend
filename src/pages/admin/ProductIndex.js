import React from 'react';
import ContentHeader from '../../components/ContentHeader';
import Spinner from 'react-bootstrap/Spinner';
import {useLocation, useHistory} from 'react-router-dom';
import useParams from '../../hooks/useParams';
import useQuery from '../../hooks/useQuery';
import Pagination from '../../components/Pagination';
import axios from 'axios';

const ProductIndex = () => {
  const [products, setProducts] = React.useState([]);
  const [title, setTitle] = React.useState('');
  const [showDeleted, setShowDeleted] = React.useState(false);
  const [offset, setOffset] = React.useState(useQuery().get('offset'));
  const [totalPages, setTotalPages] = React.useState(1);
  const urlParams = useParams(
      {
        'title': title,
        'showDeleted': showDeleted,
        'id': '',
        'offset': offset,
      },
  );

  const queryString = useLocation().search;
  const history = useHistory();

  const handleQuery = (e) => {
    e.preventDefault();
    history.push(`/admin/products?${urlParams}`);
  };

  React.useEffect(() => {
    axios.get(`http://localhost:2000/admin/products${queryString ? queryString : ''}`)
        .then((res) => {
          setProducts(res.data.products);
          setTotalPages(res.data.total_count);
        });
  }, [queryString]);
  console.log(products);

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleShowDeleted = (e) => {
    setShowDeleted(!showDeleted);
  };

  return (
    <>
      <ContentHeader title={'Productos'}/>
      <div className="admin-content-wrapper">
        <fieldset>
          <legend align="center">Buscar</legend>
          <form onSubmit={handleQuery}>
            <label className="form-label" htmlFor="name">
              Titulo
            </label>
            <input
              className="form-control"
              onChange={handleTitle}
              id="name"
              type="text"
            />
            <input
              type="checkbox"
              className="form-check-input"
              checked={showDeleted}
              onChange={handleShowDeleted}
            />
            <input type="submit" />
          </form>
        </fieldset>
        <div>
        </div>
        <Pagination pages={totalPages} url={(`http://localhost:3000/admin/products${queryString ? queryString : ''}`)} offset={offset} />
      </div>
    </>
  );
};

export default ProductIndex;
