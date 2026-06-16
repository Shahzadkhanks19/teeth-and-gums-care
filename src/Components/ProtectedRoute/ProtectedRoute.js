/* =====================================
   IMPORTS
===================================== */

import React from "react";
import { Navigate } from "react-router-dom";

/* =====================================
   PROTECTED ROUTE COMPONENT

   Purpose:
   - Restricts access to protected pages
   - Checks if admin is authenticated
   - Redirects unauthenticated users
     to Admin Login page
===================================== */

function ProtectedRoute({ children }) {
  
  /* =====================================
     GET AUTH TOKEN FROM LOCAL STORAGE
  ====================================== */
  
  const token = localStorage.getItem("adminToken");

  /* =====================================
     IF TOKEN DOES NOT EXIST
     REDIRECT TO LOGIN PAGE
  ====================================== */

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  /* =====================================
     AUTHENTICATED USER
     RENDER PROTECTED CONTENT
  ====================================== */

  return children;
}

export default ProtectedRoute;