import React from 'react';
import {Link} from 'react-router-dom';
import {authLogout} from './../features/auth/authSlice';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import '../styles/adminHeader.css';

const AdminHeader = () => {
  const dispatch = useDispatch();
  const handleDisconect = (e) => {
    dispatch(authLogout());
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
