import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './NewTaskForm.css';

export default class NewTodo extends Component {
  render() {
    return (
      <form onSubmit={this.props.createTask}>
        <label>
          <input className="new-todo" id="plc" placeholder="What needs to be done?" autoFocus />
        </label>
      </form>
    );
  }
}

NewTodo.propTypes = {
  createTask: PropTypes.func,
};
