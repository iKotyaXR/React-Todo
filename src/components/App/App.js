import React, { Component } from 'react';

import Header from '../Header';
import TodoList from '../TaskList';
import Footer from '../Footer';
import './App.css';

export default class App extends Component {
  maxId = 1;
  state = {
    todoData: [this.createTaskObject('Выучить React'), this.createTaskObject('Выучить TypeScript')],
    renderData: () => this.state.todoData.filter((el) => this.filterTask(this.state.filter, el)),
    activeButton: 1,
    filter: 'all',
  };

  onDeleted = (id) => {
    this.setState(({ todoData }) => {
      let newTodoData = JSON.parse(JSON.stringify(todoData));
      let idx = newTodoData.findIndex((el) => el['id'] === id);
      newTodoData.splice(idx, 1);
      return {
        todoData: newTodoData,
      };
    });
  };

  createTaskObject(task) {
    return { task: task, id: this.maxId++, date: Date.now(), completed: false };
  }

  createTask = (e) => {
    e.preventDefault();
    this.setState(({ todoData }) => {
      let newTodoData = JSON.parse(JSON.stringify(todoData));
      newTodoData.push(this.createTaskObject(e.target[0].value));
      e.target[0].value = '';
      return {
        todoData: newTodoData,
      };
    });
  };

  setCompleted = (id, value) => {
    let completed = value.target.checked;
    this.setState(({ todoData }) => {
      let newTodoData = JSON.parse(JSON.stringify(todoData));
      let idx = newTodoData.findIndex((el) => el['id'] === id);
      newTodoData[idx].completed = completed;
      return {
        todoData: newTodoData,
      };
    });
  };

  clearCompleted = () => {
    this.setState(({ todoData }) => {
      return {
        todoData: todoData.filter((el) => !el.completed),
      };
    });
  };

  filterTask(filter, element) {
    switch (filter) {
      case 'all':
        return true;
      case 'active':
        return !element.completed;
      case 'completed':
        return element.completed;
      default:
        throw new Error('Wrong Filter');
    }
  }

  showFilter = (el) => {
    this.setState(() => {
      return { filter: el.toLowerCase() };
    });
  };

  render = () => {
    return (
      <section className="todoapp">
        <Header createTask={this.createTask} />
        <section className="main">
          <TodoList tasks={this.state.renderData()} onDeleted={this.onDeleted} setCompleted={this.setCompleted} />
          <Footer
            showFilter={this.showFilter}
            clearCompleted={this.clearCompleted}
            count={this.state.todoData.filter((el) => !el.completed).length}
          />
        </section>
      </section>
    );
  };
}
