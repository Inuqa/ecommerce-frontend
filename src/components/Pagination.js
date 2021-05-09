import React from 'react';
import Paginate from 'react-bootstrap/Pagination';

const Pagination = ({pages = 1, handlePageClick, offset}) => {
  const items = [];
  for (let i = 1; i<=pages; i++) {
    items.push(
        <li
          className={`page-item ${(i - 1) * 8 === offset ? 'active': ''}`}
          key={i}
          onClick={handlePageClick}
        >
          <a
            className="page-link">
            {i}
          </a>
        </li>,
    );
  }
  return (
    <Paginate>
      <li
        onClick={handlePageClick}
        className={`page-item ${offset === 0 ? 'disabled' : ''}`}
      >
        <a
          className="page-link"
        >
          &lt;
        </a></li>
      {items}
      <li
        onClick={handlePageClick}
        className={`page-item ${offset === (pages - 1) * 8 ? 'disabled' : ''}`}
      >
        <a
          className="page-link"
        >
          {'>'}
        </a></li>
    </Paginate>
  );
};

export default Pagination;
