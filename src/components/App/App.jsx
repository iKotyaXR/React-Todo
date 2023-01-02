import React, { useState } from 'react';

import Header from '../Header';
import TodoList from '../TaskList';
import Footer from '../Footer';
import './App.css';

let maxId = 1;

export default function App() {
  const [todoData, setTodoData] = useState([]);
  const [filter, setFilter] = useState('all');

  const getRenderData = () => todoData.filter((el) => filterTask(filter, el));

  const onDeleted = (id) => {
    setTodoData((todoData) => {
      const newTodoData = JSON.parse(JSON.stringify(todoData));
      const idx = newTodoData.findIndex((el) => el.id === id);
      newTodoData.splice(idx, 1);
      return newTodoData;
    });
  };

  const createTaskObject = (task, timer) => {
    return { task, id: maxId++, date: Date.now(), timer: timer ? timer : 1000 * 60 * 15 };
  };

  const editTask = (taskId, value) => {
    setTodoData((todoData) => {
      let newData = JSON.parse(JSON.stringify(todoData));
      let task = newData.find((el) => el.id == taskId);
      task.task = value;
      return newData;
    });
  };

  const createTask = (e) => {
    e.preventDefault();
    if (e.target[0].value.length > 0) {
      let mins = +e.target[1].value || 0;
      let secs = +e.target[2].value || 0;

      let timer = (mins * 60 + secs) * 1000;

      setTodoData((todoData) => {
        const newTodoData = JSON.parse(JSON.stringify(todoData));
        newTodoData.push(createTaskObject(e.target[0].value, timer));
        for (let target of e.target) target.value = '';
        return newTodoData;
      });
    }
  };

  const setCompleted = (id, value) => {
    const completed = value.target.checked;
    setTodoData((todoData) => {
      const newTodoData = JSON.parse(JSON.stringify(todoData));
      const idx = newTodoData.findIndex((el) => el.id === id);
      newTodoData[idx].completed = completed;
      return newTodoData;
    });
  };

  const clearCompleted = () => {
    setTodoData((todoData) => todoData.filter((el) => !el.completed));
  };

  function filterTask(filter, element) {
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

  const showFilter = (el) => {
    setFilter(el.toLowerCase());
  };

  return (
    <section className="todoapp">
      <Header createTask={createTask} />
      <section className="main">
        <TodoList tasks={getRenderData()} onDeleted={onDeleted} setCompleted={setCompleted} editTask={editTask} />
        <Footer
          showFilter={showFilter}
          clearCompleted={clearCompleted}
          count={todoData.filter((el) => !el.completed).length}
        />
      </section>
    </section>
  );
}
