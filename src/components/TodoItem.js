import React, { useState } from 'react';

const TodoItem = ({ todo, toggleTodo, deleteTodo, editTodo }) => {
  const { id, text, completed, date } = todo;
  const [editable, setEditable] = useState(false);
  const [updatedText, setUpdatedText] = useState(text);

  const handleEdit = () => {

    if (!editable) {
      setEditable(true);
    } else {
      // Save updated text
      console.log("clicked");
      editTodo(id, updatedText);
      setEditable(false);
    }
  };

  return (
    <li className={`todo-item ${completed ? 'completed' : ''}`}>
      <div>
        <input
          type="checkbox"
          checked={completed}
          onChange={() => toggleTodo(id)}
        />
        {editable ? (
          <input
            type="text"
            value={updatedText}
            onChange={(e) => setUpdatedText(e.target.value)}
            autoFocus
            onBlur={() => {
              if (editable) handleEdit();
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleEdit();
            }}
            // onClick={() => {
            //   if (!editable) {
            //     setEditable(true);
            //   }
            // }}
          />
        ) : (
          <span>{text}</span>
        )}
        {date && <span className="date">  -- Created on: {new Date(date).toLocaleDateString()}</span>}
      </div>
      <div>
        <button className='btn' onClick={handleEdit}>{editable ? 'Enter' : 'Edit'}</button>
        <button className='delete-btn' onClick={() => deleteTodo(id)}>Delete</button>
      </div>
    </li>
  );
};

export default TodoItem;
