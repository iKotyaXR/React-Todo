import React, { useState } from 'react';

import './TaskFilter.css';

function Filter({ name, onClick, className }) {
  return (
    <li>
      <button className={className} onClick={onClick}>
        {name}
      </button>
    </li>
  );
}

export default function TaksFilter(props) {
  const [active, setActive] = useState('All');
  const { showFilter } = props;
  const filters = [{ name: 'All' }, { name: 'Active' }, { name: 'Completed' }];
  const liFilters = filters.map((el) => (
    <Filter
      key={el.name}
      className={active === el.name ? 'selected' : null}
      onClick={() => {
        showFilter(el.name);
        setActive(el.name);
      }}
      {...el}
    />
  ));
  return <ul className="filters">{liFilters}</ul>;
}
