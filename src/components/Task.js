import React from "react";

function Task({ task, deleteTask, toggleComplete }) {
  return (
    <li className={task.completed ? "completed" : ""}>
      <span onClick={() => toggleComplete(task.id)}>{task.text}</span>
      <button onClick={() => deleteTask(task.id)}>Delete</button>
    </li>
  );
}

export default Task;
