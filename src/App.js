import React, { useState, useEffect, useCallback } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './App.css';

function App() {
  const [taskInput, setTaskInput] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All'); // For filtering tasks

  const addTask = async () => {
    if (taskInput.trim()) {
      const newTask = {
        title: taskInput,
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

  const deleteTask = async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'DELETE',
    });
    setTasks(tasks.filter((task) => task.id !== id));
  };

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

  const handleDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) return;

    const reorderedTasks = Array.from(tasks);
    const [movedTask] = reorderedTasks.splice(source.index, 1);
    reorderedTasks.splice(destination.index, 0, movedTask);

    setTasks(reorderedTasks);
  };

  const checkForExpiredTasks = useCallback(() => {
    const now = new Date().getTime();
    const overdueTasks = tasks.filter(
      (task) => task.dueDate && new Date(task.dueDate).getTime() < now && !task.completed
    );

    if (overdueTasks.length > 0) {
      alert(`You have ${overdueTasks.length} overdue task(s)!`);
    }
  }, [tasks]);

  useEffect(() => {
    const interval = setInterval(checkForExpiredTasks, 60000); // Check every minute
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [checkForExpiredTasks]);

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'Completed') return task.completed;
    if (filter === 'Incomplete') return !task.completed;
    return true;
  });

  return (
    <div className="app">
      <h1>Interactive To-Do List</h1>
      <div className="input-section">
        <input
          type="text"
          placeholder="Enter a task"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <input
          type="datetime-local"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="filters">
        <button onClick={() => setFilter('All')}>All</button>
        <button onClick={() => setFilter('Completed')}>Completed</button>
        <button onClick={() => setFilter('Incomplete')}>Incomplete</button>
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="task-list">
          {(provided) => (
            <div
              className="task-list"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {filteredTasks.length === 0 && <p>No tasks to display</p>}
              {filteredTasks.map((task, index) => (
                <Draggable key={task.id} draggableId={String(task.id)} index={index}>
                  {(provided) => (
                    <div
                      className={`task-item ${task.completed ? 'completed' : ''} ${
                        task.dueDate &&
                        new Date(task.dueDate).getTime() < Date.now() &&
                        !task.completed
                          ? 'overdue'
                          : ''
                      }`}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleComplete(task.id)}
                      />
                      <span className="task-text">{task.title}</span>
                      {task.dueDate && <span className="due-date">{new Date(task.dueDate).toLocaleString()}</span>}
                      <button
                        className="delete-btn"
                        onClick={() => deleteTask(task.id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default App;
