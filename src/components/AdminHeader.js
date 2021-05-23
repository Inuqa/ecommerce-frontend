import React from 'react';
import '../styles/adminHeader.css';

const AdminHeader = () => {
  return (
    <div className="admin-nav">
      <header className="admin-nav-header">
        <h1>coyote</h1>
      </header>
      <div className="admin-nav-body">
        <nav className="admin-nav-menu">
          <ul className="nav flex-column">
            <li className="nav-item">
              <a className="nav-link active" href="#">Ordenes</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Productos</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Stock</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Slider</a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="admin-nav-footer">
      </div>
    </div>
  );
};

export default AdminHeader;
