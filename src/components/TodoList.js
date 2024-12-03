import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ tasks, deleteTask }) {
  return (
    <ul>
      {tasks.map((task) => (
        <TodoItem key={task.id} task={task} deleteTask={deleteTask} />
      ))}
    </ul>
  );
}

export default TodoList;