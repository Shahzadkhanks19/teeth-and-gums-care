import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Toaster } from "react-hot-toast";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Toaster
  position="top-right"
  toastOptions={{
    duration: 4000,
    style: {
      zIndex: 999999,
      marginTop: "80px",
      borderRadius: "12px",
      background: "#fff",
      color: "#333",
      fontWeight: "500",
      boxShadow: "0 10px 35px rgba(0,0,0,0.15)",
    },
    success: {
      iconTheme: {
        primary: "#16a34a",
        secondary: "#fff",
      },
    },
    error: {
      iconTheme: {
        primary: "#dc2626",
        secondary: "#fff",
      },
    },
  }}
/>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
