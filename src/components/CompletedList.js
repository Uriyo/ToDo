import React from 'react';

const CompletedList = ({ completedTodos }) => {
  return (
    <div>
      <h2>Completed Tasks:</h2>
      <ul>
        {completedTodos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default CompletedList;
