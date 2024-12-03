import React from 'react';

function TodoItem({ task, deleteTask }) {
  return (
    <li>
      <span>{task.text}</span>
      <button onClick={() => deleteTask(task.id)}>Delete</button>
    </li>
  );
}

export default TodoItem;