import React from 'react';

function Task({ task, deleteTask, toggleCompletion }) {
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date();

  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div>
        <span onClick={() => toggleCompletion(task.id)} className="task-title">
          {task.title}
        </span>
        {task.dueDate !== 'No due date' && (
          <span className={`due-date ${isOverdue ? 'overdue' : ''}`}>
            Due: {task.dueDate}
          </span>
        )}
      </div>
      <button className="delete-btn" onClick={() => deleteTask(task.id)}>
        Delete
      </button>
    </li>
  );
}

export default Task;
