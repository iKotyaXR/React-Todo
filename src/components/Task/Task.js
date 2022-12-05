import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { formatDistanceToNow } from 'date-fns';

export default class Task extends Component {
  state = {
    date: this.date || Date.now(),
  };

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState(() => ({ date: this.date }));
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { task, date, onDeleted, completed, setCompleted } = this.props;
    this.date = date;
    return (
      <li className={completed ? 'completed' : null}>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={setCompleted} />
          <label>
            <span className="description">{task}</span>
            <span className="created">created {formatDistanceToNow(this.date)} ago</span>
          </label>
          <button className="icon icon-edit"></button>
          <button onClick={onDeleted} className="icon icon-destroy"></button>
        </div>
      </li>
    );
  }
}

Task.defaultProps = {
  date: Date.now(),
  completed: false,
};
Task.propTypes = {
  date: PropTypes.number,
  completed: PropTypes.bool,
  task: PropTypes.string,
  onDeleted: PropTypes.func,
  setCompleted: PropTypes.func,
};
