import React from 'react';

function TaskForm({ taskInput, setTaskInput, dueDate, setDueDate, addTask }) {
  return (
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
      <button onClick={() => addTask(taskInput)}>Add Task</button>
    </div>
  );
}

export default TaskForm;
