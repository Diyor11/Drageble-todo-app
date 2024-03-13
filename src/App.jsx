import './App.css';
import React, { useState } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState('');

  const handleInputChange = (event) => {
    setTodoText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (todoText.trim() === '') {
      return;
    }

    const newTodo = {
      id: Date.now(),
      text: todoText,
      column: "backlog"
    };

    setTodos([...todos, newTodo]);
    setTodoText('');
  };

  const handleDragStart = (event, id) => {
    event.dataTransfer.setData('text/plain', id);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, column) => {
    event.preventDefault();
    const todoId = event.dataTransfer.getData('text/plain');
    const updatedTodos = todos.map((todo) => {
      if (todo.id === parseInt(todoId)) {
        return {
          ...todo,
          column,
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const renderCards = (column) => {
    return todos.map((todo) => {
      if (todo.column === column) {
        return (
          <div
            key={todo.id}
            className="card"
            draggable
            onDragStart={(e) => handleDragStart(e, todo.id)}
          >
            {todo.text}
          </div>
        );
      }
      return null;
    });
  };

  return (
    <>
      <div className="form-container">
        <h2>Create New To-Do</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={todoText}
            onChange={handleInputChange}
            placeholder="Enter your to-do"
            required
          />
          <button type="submit">Add</button>
        </form>
      </div>
      <div className="container">
        <div
          className="column"
          id="backlog"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, 'backlog')}
        >
          <h2>Backlog</h2>
          {renderCards('backlog')}
        </div>
        <div
          className="column"
          id="todo"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, 'todo')}
        >
          <h2>To Do</h2>
          {renderCards('todo')}
        </div>
        <div
          className="column"
          id="done"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, 'done')}
        >
          <h2>Done</h2>
          {renderCards('done')}
        </div>
      </div>
    </>
  );
}

export default App;
