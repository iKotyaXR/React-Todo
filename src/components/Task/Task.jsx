import React, { Component, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

export default function Task(props) {
  const [edit, setEdit] = useState(false);
  const [paused, setPaused] = useState(true);
  const [timer, setTimer] = useState(props.timer);

  const { id, task, date, onDeleted, completed, setCompleted, editTask } = props;

  useEffect(() => {
    const taskTimer = setInterval(() => {
      setTimer((timer) => (paused ? timer : timer - 1000));
    }, 1000);
    return () => clearInterval(taskTimer);
  }, [paused]);

  function editText(el) {
    el.preventDefault();
    let text = el.target[0].value;
    if (text.length > 0) {
      editTask(text);
    }
    setEdit(false);
  }

  function timerTask() {
    let minutes = Math.floor(timer / (1000 * 60));
    let seconds = Math.floor((timer % (1000 * 60)) / 1000);

    if (timer > 0) {
      return `  ${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`;
    } else {
      return '  0:0';
    }
  }

  return (
    <li className={completed ? 'completed' : null}>
      <div className="view">
        <input className="toggle" defaultChecked={!!completed} id={id} type="checkbox" onClick={setCompleted} />
        {edit ? (
          <label htmlFor={id}>
            <form onSubmit={editText.bind(this)}>
              <input className="description" autoFocus></input>
            </form>
          </label>
        ) : (
          <label htmlFor={id}>
            <span className="title">{task}</span>
            <span className="description">
              <button className="icon icon-play" onClick={() => setPaused(false)}></button>
              <button className="icon icon-pause" onClick={() => setPaused(true)}></button>
              {timerTask()}
            </span>
            <span className="description">created {formatDistanceToNow(date)} ago</span>
          </label>
        )}
        <button className="icon icon-edit" onClick={() => setEdit((edit) => !edit)} />
        <button onClick={onDeleted} className="icon icon-destroy" />
      </div>
    </li>
  );
}

export class Task1 extends Component {
  task = '';

  state = {
    date: this.date || Date.now(),
    edit: false,
    paused: true,
    timer: this.props.timer,
  };

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState(({ paused }) => ({
        date: this.date,
        timer: paused ? this.state.timer : this.state.timer - 1000,
      }));
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { task, date, onDeleted, completed, setCompleted } = this.props;
    this.date = date;
    this.task = task;
    return (
      <li className={completed ? 'completed' : null}>
        <div className="view">
          <input
            className="toggle"
            defaultChecked={!!completed}
            id={this.props.id}
            type="checkbox"
            onClick={setCompleted}
          />
          <button onClick={onDeleted} className="icon icon-destroy" />
        </div>
      </li>
    );
  }
}

Task.defaultProps = {
  completed: false,
};
Task.propTypes = {
  timer: PropTypes.number,
  date: PropTypes.number,
  completed: PropTypes.bool,
  task: PropTypes.string,
  onDeleted: PropTypes.func,
  setCompleted: PropTypes.func,
};
