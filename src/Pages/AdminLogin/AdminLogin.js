import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../../api/api";
import toast from "react-hot-toast";
import "./AdminLogin.css";

function AdminLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_BASE_URL}/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(
          data.message || "Invalid login credentials"
        );
        return;
      }

      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminEmail", data.admin.email);

      toast.success("Login successful");

      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 500);
    } catch (error) {
      toast.error("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-icon">
          <i className="fa-solid fa-user-shield"></i>
        </div>

        <h1>Admin Login</h1>

        <p>Access Teeth & Gums Care dashboard securely.</p>

        <form onSubmit={handleSubmit}>
          <div className="admin-input-group">
            <i className="fa-solid fa-envelope"></i>

            <input
              type="email"
              name="email"
              placeholder="Admin Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="admin-input-group">
            <i className="fa-solid fa-lock"></i>

            <input
              type="password"
              name="password"
              placeholder="Admin Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="forgot-password-link">
            <a href="/admin/forgot-password">
              Forgot Password?
            </a>
          </div>

          <button type="submit" disabled={loading}>
            {loading
              ? "Logging in..."
              : "Login to Dashboard"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default AdminLogin;