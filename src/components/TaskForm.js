import React, { useState } from 'react';

const TaskForm = ({ addTask }) => {
  const [task, setTask] = useState("");

  // Handle changes to the input field
  const handleInputChange = (e) => {
    setTask(e.target.value);
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevents the form from refreshing the page
    if (task.trim()) {
      addTask(task); // Pass the task to the parent component
      setTask(""); // Reset the input field after submitting
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        value={task}
        onChange={handleInputChange}
        placeholder="Enter a task"
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
