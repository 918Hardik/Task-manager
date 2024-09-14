import React from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const App = () => {
  return (
    <div className="App">
      <h1 className="text-3xl font-bold text-center ">Task Manager</h1>
      <TaskForm />
      <TaskList />
    </div>
  );
};

export default App;
