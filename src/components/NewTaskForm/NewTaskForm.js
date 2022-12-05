import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './NewTaskForm.css';

export default class NewTodo extends Component {
  render() {
    return (
      <form onSubmit={this.props.createTask}>
        <input className="new-todo" placeholder="What needs to be done?" autoFocus />
      </form>
    );
  }
}

NewTodo.propTypes = {
  createTask: PropTypes.func,
};
