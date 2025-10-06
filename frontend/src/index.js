import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import reportWebVitals from './reportWebVitals.js';
import { Toaster } from 'react-hot-toast'; // ✅ Add this

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <>
      <Toaster position="top-right" reverseOrder={false} /> {/* ✅ Add this */}
      <App />
    </>
  </React.StrictMode>
);

reportWebVitals();
