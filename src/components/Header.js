import React from 'react';
import {
  Link,
} from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Nav>
        <Nav.Item>
          <Link className="nav-link" to="/"
          >
        Home
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
};

export default Header;
