/* =====================================
   ADMIN LOGIN PAGE IMPORTS
===================================== */

// React hooks
import React, { useState } from "react";

// Routing
import { useNavigate } from "react-router-dom";

// API base URL
import API_BASE_URL from "../../api/api";

// Toast notifications
import toast from "react-hot-toast";

// Page styles
import "./AdminLogin.css";

/* =====================================
   ADMIN LOGIN COMPONENT
===================================== */

function AdminLogin() {
  const navigate = useNavigate();

  /* =====================================
     FORM STATE
  ====================================== */

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* =====================================
     PASSWORD VISIBILITY STATE
  ====================================== */

  const [showPassword, setShowPassword] = useState(false);

  /* =====================================
     HANDLE INPUT CHANGE
  ====================================== */

  const handleChange = (e) => {
    setError("");

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* =====================================
     HANDLE LOGIN SUBMIT
  ====================================== */

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email.trim() || !formData.password.trim()) {
      const errorMessage = "Please enter email and password";
      setError(errorMessage);
      toast.error(errorMessage);
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_BASE_URL}/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email.trim(),
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data.message || "Invalid login credentials";
        setError(errorMessage);
        toast.error(errorMessage);
        return;
      }

      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminEmail", data.admin.email);

      toast.success("Login successful");

      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 500);
    } catch (error) {
      const errorMessage = "Server error. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="admin-login-page">
      <div className="admin-login-card">
        {/* =====================================
            LOGIN ICON
        ====================================== */}
        <div className="admin-login-icon">
          <i className="fa-solid fa-user-shield"></i>
        </div>

        {/* =====================================
            LOGIN HEADING
        ====================================== */}
        <h1>Admin Login</h1>

        <p>Access Teeth & Gums Care dashboard securely.</p>

        {/* =====================================
            ERROR ALERT
        ====================================== */}
        {error && (
          <div className="admin-login-error">
            <i className="fa-solid fa-circle-exclamation"></i>
            <span>{error}</span>
          </div>
        )}

        {/* =====================================
            LOGIN FORM
        ====================================== */}
        <form onSubmit={handleSubmit}>
          <div className="admin-input-group">
            <i className="fa-solid fa-envelope"></i>

            <input
              type="email"
              name="email"
              placeholder="Admin Email"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div className="admin-input-group password-input-group">
            <i className="fa-solid fa-lock"></i>

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Admin Password"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
            />

            <button
              type="button"
              className="password-toggle-btn"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              disabled={loading}
            >
              <i
                className={
                  showPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"
                }
              ></i>
            </button>
          </div>

          <div className="forgot-password-link">
            <a href="/admin/forgot-password">Forgot Password?</a>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? (
              <>
                <i className="fa-solid fa-spinner fa-spin me-2"></i>
                Logging in...
              </>
            ) : (
              <>
                <i className="fa-solid fa-right-to-bracket me-2"></i>
                Login to Dashboard
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}

export default AdminLogin;