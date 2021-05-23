import React from 'react';
import ContentHeader from '../../components/ContentHeader';
import Spinner from 'react-bootstrap/Spinner';
import {Link, useLocation, useHistory} from 'react-router-dom';
import useParams from '../../hooks/useParams';
import useQuery from '../../hooks/useQuery';
import Pagination from '../../components/Pagination';
import axios from 'axios';
import {
  faEdit,
  faTrash,
  faTrashRestore,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const ProductIndex = () => {
  const [products, setProducts] = React.useState([]);
  const [title, setTitle] = React.useState(decodeURIComponent(useQuery().get('title')));
  const [showDeleted, setShowDeleted] = React.useState(JSON.parse(useQuery().get('show_deleted')));
  const [offset] = React.useState(useQuery().get('offset'));
  const [totalPages, setTotalPages] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const {url, urlNoOffset} = useParams(
      {
        'title': title,
        'show_deleted': showDeleted,
        'id': '',
        'offset': offset,
      },
  );

  console.log(title);

  const queryString = useLocation().search;
  const history = useHistory();

  const handleQuery = (e) => {
    e.preventDefault();
    history.push(`/admin/products?${url}`);
  };

  React.useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:2000/admin/products${queryString ? queryString : ''}`)
        .then((res) => {
          setProducts(res.data.products);
          setTotalPages(res.data.total_count);
          setLoading(false);
        });
  }, [queryString]);
  console.log(products);

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleShowDeleted = (e) => {
    setShowDeleted(!showDeleted);
  };

  const renderProducts = products.map((item) =>
    <tr key={item.id}>
      <td>{item.id}</td>
      <td><img src={item.image} height="50" width="50" alt="" /></td>
      <td>{item.title}</td>
      <td>{item.price}</td>
      <td>
        <Link to="#"><FontAwesomeIcon icon={faEdit} /></Link>
        {
          item.discarded_at ?
          <Link to="#">
            <FontAwesomeIcon icon={faTrashRestore} />
          </Link> :
        <Link to="#">
          <FontAwesomeIcon icon={faTrash} />
        </Link>
        }
      </td>
    </tr>,
  );

  return (
    <>
      <ContentHeader title={'Productos'}/>
      <div className="admin-content-wrapper">
        <fieldset>
          <legend align="center">Buscar</legend>
          <form onSubmit={handleQuery} className="d-flex flex-column">
            <label className="form-label" htmlFor="name">
              Titulo
            </label>
            <input
              className="form-control"
              onChange={handleTitle}
              value={title}
              id="name"
              type="text"
            />
            <div>
              <input
                type="checkbox"
                className="form-check-input"
                checked={showDeleted}
                onChange={handleShowDeleted}
                id="show_deleted"
              />
              <label
                className="form-label ms-1"
                htmlFor="show_deleted"
              >
                Mostrar borrados
              </label>
            </div>
            <input className="btn btn-primary" type="submit" />
          </form>
        </fieldset>
        <div>
          <table className="table">
            <colgroup>
              <col style={{width: '15%'}} />
              <col style={{width: '5%'}} />
              <col style={{width: '50%'}} />
              <col style={{width: '15%'}} />
              <col style={{width: '15%'}} />
            </colgroup>
            <thead>
              <tr>
                <th>ID</th>
                <th></th>
                <th>Nombre</th>
                <th>Precio</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {loading ?
                  <tr>
                    <td>
                      <Spinner
                        animation="border"
                        variant="primary"
                      />
                    </td>
                  </tr> :
              renderProducts}
            </tbody>
          </table>
        </div>
        <Pagination
          pages={totalPages}
          url={
            (`/admin/products${
              urlNoOffset ? '?' + urlNoOffset + '&' : ''
            }`)
          }
          limit={10}
        />
      </div>
    </>
  );
};

export default ProductIndex;
