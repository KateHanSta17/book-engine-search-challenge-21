import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './App.css'; // Importing your CSS

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') // Make sure this matches your HTML root ID
);
