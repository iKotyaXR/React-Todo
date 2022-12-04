import React, { Component } from 'react';

import Task from '../Task/';
import './TaskList.css';

export default class TaskList extends Component {
  render() {
    const { tasks, onDeleted, setCompleted } = this.props;
    const elements = tasks.map((el) => (
      <Task setCompleted={(val) => setCompleted(el.id,val)} onDeleted={() => onDeleted(el.id)} key={el.id} {...el} />
    ));
    return <ul className="todo-list">{elements}</ul>;
  }
}
