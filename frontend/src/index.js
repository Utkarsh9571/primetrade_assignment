import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
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
