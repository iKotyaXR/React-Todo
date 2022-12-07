import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

function edit() {
  this.setState(({ edit }) => ({ edit: !edit }));
}

function editText(el) {
  el.preventDefault();
  let text = el.target[0].value;
  if (text.length > 0) {
    this.props.editTask(text);
  }
  this.setState(() => ({ edit: false }));
}
function TaskText(edit) {
  if (edit) {
    return (
      <label htmlFor={this.props.id}>
        <form onSubmit={editText.bind(this)}>
          <input className="description"></input>
        </form>
      </label>
    );
  } else
    return (
      <label htmlFor={this.props.id}>
        <span className="description">{this.task}</span>
        <span className="created">created {formatDistanceToNow(this.date)} ago</span>
      </label>
    );
}

export default class Task extends Component {
  task = '';

  state = {
    date: this.date || Date.now(),
    edit: false,
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
    const { task, date, onDeleted, completed, setCompleted, editTask } = this.props;
    this.date = date;
    this.task = task;
    return (
      <li className={completed ? 'completed' : null}>
        <div className="view">
          <input className="toggle" id={this.props.id} type="checkbox" onClick={setCompleted} />
          {TaskText.call(this, this.state.edit)}
          <button className="icon icon-edit" onClick={edit.bind(this)} />
          <button onClick={onDeleted} className="icon icon-destroy" />
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
