import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Optional: If you want to add styles
import TodoApp from './TodoApp.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TodoApp />
  </React.StrictMode>
);