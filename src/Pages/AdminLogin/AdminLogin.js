import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../../api/api";
import "./AdminLogin.css";

function AdminLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please enter email and password");
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
        setError(data.message || "Invalid login credentials");
        return;
      }

      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminEmail", data.admin.email);

      navigate("/admin/dashboard");
    } catch (error) {
      setError("Server error. Please try again.");
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

        {error && <div className="admin-login-error">{error}</div>}

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

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login to Dashboard"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default AdminLogin;