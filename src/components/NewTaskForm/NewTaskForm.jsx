import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './NewTaskForm.css';

export default class NewTodo extends Component {
  render() {
    return (
      <form className="new-todo-form" onSubmit={this.props.createTask}>
        <input className="new-todo" id="plc" placeholder="What needs to be done?" autoFocus />
        <input className="new-todo-form__timer" placeholder="Min" />
        <input className="new-todo-form__timer" placeholder="Sec" />

        {/*Форма с несколькими инпутами не обрабавтывается в onSubmit без него ;(*/}
        <input type="submit" style={{ display: 'none' }}></input>
      </form>
    );
  }
}

NewTodo.propTypes = {
  createTask: PropTypes.func,
};
