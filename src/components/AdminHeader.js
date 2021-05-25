import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import '../styles/adminHeader.css';

const AdminHeader = () => {
  const handleDisconect = (e) => {
    axios.delete('http://localhost:2000/logout', {withCredentials: true})
        .then((res) => console.log(res));
  };
  return (
    <div className="admin-nav">
      <header className="admin-nav-header">
        <h1>coyote</h1>
      </header>
      <div className="admin-nav-body">
        <nav className="admin-nav-menu">
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link to="/admin/orders"
                className="nav-link active"
              >
                Ordenes
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/admin/products"
                className="nav-link"
              >
              Productos
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="#"className="nav-link"
              >
              Stock
              </Link>
            </li>
            <li className="nav-item">
              <Link to="#" className="nav-link"
              >
                Slider
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="admin-nav-footer">
        <ul className="nav flex-column">
          <li>
            <button onClick={handleDisconect}>
              Desconectar
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminHeader;
