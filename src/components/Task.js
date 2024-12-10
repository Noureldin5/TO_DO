// Task.js
import React from 'react';

function Task({ task, toggleComplete, deleteTask }) {
  return (
    <div
      className={`task-item ${task.completed ? 'completed' : ''} ${
        task.dueDate &&
        new Date(task.dueDate).getTime() < Date.now() &&
        !task.completed
          ? 'overdue'
          : ''
      }`}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleComplete(task.id)}
      />
      <span className="task-text">{task.title}</span>
      {task.dueDate && (
        <span className="due-date">
          {new Date(task.dueDate).toLocaleString()}
        </span>
      )}
      <button
        className="delete-btn"
        onClick={() => deleteTask(task.id)}
      >
        Delete
      </button>
    </div>
  );
}

export default Task;
