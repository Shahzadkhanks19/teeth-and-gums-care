import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Toaster } from "react-hot-toast";
import { HelmetProvider } from "react-helmet-async";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <HelmetProvider>
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
    </HelmetProvider>
  </React.StrictMode>
);

reportWebVitals();