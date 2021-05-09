import React from 'react';
import Paginate from 'react-bootstrap/Pagination';

const Pagination = ({pages = 1, url, offset}) => {
  const items = [];
  for (let i = 1; i<=pages; i++) {
    items.push(
        <li
          className={`page-item ${(i - 1) * 8 === +offset ? 'active': ''}`}
          key={i}
        >
          <a
            href={`${url}?offset=${8 * (i - 1)}`}
            className="page-link">
            {i}
          </a>
        </li>,
    );
  }
  return (
    <Paginate>
      <li
        className={`page-item ${+offset === 0 ? 'disabled' : ''}`}
      >
        <a
          href={`${url}?offset=${offset - 8}`}
          className="page-link"
        >
          &lt;
        </a></li>
      {items}
      <li
        className={`page-item ${+offset === (pages - 1) * 8 ? 'disabled' : ''}`}
      >
        <a
          href={`${url}?offset=${+offset + 8}`}
          className="page-link"
        >
          {'>'}
        </a></li>
    </Paginate>
  );
};

export default Pagination;
