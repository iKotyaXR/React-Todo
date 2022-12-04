import React, { Component } from 'react';

import { formatDistanceToNow } from 'date-fns';

export default class Task extends Component {
  render() {
    const { task, date, onDeleted, completed, setCompleted } = this.props;
    return (
      <li className={completed ? 'completed' : null}>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={setCompleted} />
          <label>
            <span className="description">{task}</span>
            <span className="created">created {formatDistanceToNow(date)} ago</span>
          </label>
          <button className="icon icon-edit"></button>
          <button onClick={onDeleted} className="icon icon-destroy"></button>
        </div>
      </li>
    );
  }
}
