import React from 'react';

import NewTaskForm from '../NewTaskForm';

const Header = ({ createTask }) => (
  <header>
    <h1>todos</h1>
    <NewTaskForm createTask={createTask} />
  </header>
);

export default Header;
