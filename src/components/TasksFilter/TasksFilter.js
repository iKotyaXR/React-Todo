import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './TaskFilter.css';

const Filter = ({ name, onClick, className }) => (
  <li>
    <button className={className} onClick={onClick}>
      {name}
    </button>
  </li>
);

export default class TaskFilter extends Component {
  state = {
    active: 'All',
  };

  render() {
    const { showFilter } = this.props;
    const filters = [{ name: 'All' }, { name: 'Active' }, { name: 'Completed' }];
    const liFilters = filters.map((el) => (
      <Filter
        key={el.name}
        className={this.state.active === el.name ? 'selected' : null}
        onClick={() => {
          showFilter(el.name);
          this.setState({
            active: el.name,
          });
        }}
        {...el}
      />
    ));
    return <ul className="filters">{liFilters}</ul>;
  }
}

TaskFilter.propTypes = {
  showFilter: PropTypes.func,
};
