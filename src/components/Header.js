import React from 'react';
import {
  Link,
  useLocation,
} from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import AdminHeader from './AdminHeader';

const Header = () => {
  const location = useLocation();
  if (location.pathname.includes('/admin')) {
    return (
      <AdminHeader />
    );
  } else {
    return (
      <Navbar bg="dark" variant="dark">
        <Nav>
          <Nav.Item>
            <Link className="nav-link" to="/"
            >
        Inicio
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link className="nav-link" to="/products"
            >
        Products
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link className="nav-link" to="/about"
            >
        About
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link className="nav-link" to="/cart"
            >
        Cart
            </Link>
          </Nav.Item>
        </Nav>
      </Navbar>
    );
  }
};

export default Header;
