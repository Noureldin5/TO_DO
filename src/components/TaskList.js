import React from 'react';
import './TaskList.css';

function TaskList({ tasks, onDelete, onToggleComplete }) {
  return (
    <div className="task-list">
      {tasks.length === 0 ? <p>No tasks to display</p> : null}
      {tasks.map(task => (
        <div className={`task-item ${task.completed ? 'completed' : ''}`} key={task.id}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleComplete(task.id)}
          />
          <span className="task-text">{task.title}</span>
          {task.dueDate && <span className="due-date">{task.dueDate}</span>}
          <button className="delete-btn" onClick={() => onDelete(task.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
