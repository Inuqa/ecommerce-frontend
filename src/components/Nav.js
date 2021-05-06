import React from 'react';
import {
  Link,
} from 'react-router-dom';

const Nav = () => {
  return (
    <div className="nav">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
    </div>
  );
};

export default Nav;
