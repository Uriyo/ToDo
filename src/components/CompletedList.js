import React from 'react';

const CompletedList = ({ completedTodos }) => {
  return (
    <div className='compList'>
      <h2>Completed Tasks:</h2>
      
      <ul>
        {completedTodos.map((todo) => (
          <li key={todo.id} className='compLi'>{todo.text} ✔️ </li>
        ))}
      </ul>
    </div>
  );
};

export default CompletedList;
 