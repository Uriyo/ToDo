import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import CompletedList from './components/CompletedList';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    fetch('http://localhost:5000/todos')
      .then(response => response.json())
      .then(data => setTodos(data))
      .catch(error => console.error('Error fetching todos:', error));
  };

  const addTodo = (text) => {
    fetch('http://localhost:5000/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, completed: false, date: new Date() }),
    })
      .then(response => response.json())
      .then(data => {
        setTodos([...todos, data]);
      })
      .catch(error => console.error('Error adding todo:', error));
  };

  const toggleTodo = (id) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);

    fetch(`http://localhost:5000/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTodos.find(todo => todo.id === id)),
    })
      .then(response => response.json())
      .then(data => console.log('Todo updated:', data))
      .catch(error => console.error('Error updating todo:', error));
  };

  const deleteTodo = (id) => {
    fetch(`http://localhost:5000/todos/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        const updatedTodos = todos.filter(todo => todo.id !== id);
        setTodos(updatedTodos);
      })
      .catch(error => console.error('Error deleting todo:', error));
  };

  const editTodo = (id, newText) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    );
    setTodos(updatedTodos);

    fetch(`http://localhost:5000/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTodos.find(todo => todo.id === id)),
    })
      .then(response => response.json())
      .then(data => console.log('Todo updated:', data))
      .catch(error => console.error('Error updating todo:', error));
      //fetchTodos();
  };

  const handleCompletedTodos = () => {
    const completed = todos.filter(todo => todo.completed);
    setCompletedTodos(completed);
  };

  return (
    <div className="app">
      <h1>Things-To-Do List</h1>
      <TodoForm addTodo={addTodo} />
      <h2>Open Tasks:</h2>
      <TodoList
        todos={todos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
        editTodo={editTodo} 
      />

      <button className='compbtn' onClick={handleCompletedTodos}>Show Completed Tasks</button>
      {completedTodos.length > 0 && <CompletedList completedTodos={completedTodos} />}
    </div>
  );
};

export default App;
