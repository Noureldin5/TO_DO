// App.js
import React, { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  const [taskInput, setTaskInput] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All'); // For filtering tasks

  // Add task
  const addTask = async (taskTitle) => {
    if (taskTitle.trim()) {
      const newTask = {
        title: taskTitle,
        completed: false,
        dueDate: dueDate || null,
      };

      const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });

      const createdTask = await response.json();
      setTasks([...tasks, { ...createdTask, dueDate: newTask.dueDate }]);

      // Clear input fields
      setTaskInput('');
      setDueDate('');
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'DELETE',
    });
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggle task completion
  const toggleComplete = async (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            completed: !task.completed,
          }
        : task
    );

    const updatedTask = updatedTasks.find((task) => task.id === id);

    await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed: updatedTask.completed }),
    });

    setTasks(updatedTasks);
  };

  // Filter tasks based on status
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'Completed') return task.completed;
    if (filter === 'Incomplete') return !task.completed;
    return true;
  });

  return (
    <div className="app">
      <h1>Interactive To-Do List</h1>
      <TaskForm addTask={addTask} taskInput={taskInput} setTaskInput={setTaskInput} dueDate={dueDate} setDueDate={setDueDate} />
      <div className="filters">
        <button onClick={() => setFilter('All')}>All</button>
        <button onClick={() => setFilter('Completed')}>Completed</button>
        <button onClick={() => setFilter('Incomplete')}>Incomplete</button>
      </div>
      <TaskList
        tasks={tasks}
        toggleComplete={toggleComplete}
        deleteTask={deleteTask}
        filteredTasks={filteredTasks}
      />
    </div>
  );
}

export default App;
