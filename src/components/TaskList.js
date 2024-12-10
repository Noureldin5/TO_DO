// TaskList.js
import React from 'react';
import Task from './Task'; // Import Task component

function TaskList({ tasks, toggleComplete, deleteTask, filteredTasks }) {
  return (
    <div className="task-list">
      {filteredTasks.length === 0 && <p>No tasks to display</p>}
      {filteredTasks.map((task) => (
        <Task
          key={task.id}
          task={task} // Passing task as a prop to Task component
          toggleComplete={toggleComplete}
          deleteTask={deleteTask}
        />
      ))}
    </div>
  );
}

export default TaskList;
