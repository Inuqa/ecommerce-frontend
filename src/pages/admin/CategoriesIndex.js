import React from 'react';
import ContentHeader from '../../components/ContentHeader';
import Spinner from 'react-bootstrap/Spinner';
import {Link, useLocation, useHistory} from 'react-router-dom';
import useCategories from '../../hooks/useCategories';

const CategoriesIndex = () => {
  const [categories, setCategories] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const {index} = useCategories();

  React.useEffect(() => {
    index()
        .then((res) => {
          setCategories(res.data);
        });
  }, []);

  const renderCategories = categories.map((item) =>
    <tr key={item.id}>
      <td>{item.id}</td>
      <td>{item.name}</td>
    </tr>,
  );

  return (
    <>
      <ContentHeader
        title={'Categorias'}
        btn='#'
        btnVal='Crear Categoria'
      />
      <div className="admin-content-wrapper">
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
            </tr>
          </thead>
          <tbody>
            {renderCategories}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CategoriesIndex;
