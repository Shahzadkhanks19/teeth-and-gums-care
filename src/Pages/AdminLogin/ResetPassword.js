import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API_BASE_URL from "../../api/api";
import "./AdminLogin.css";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${API_BASE_URL}/admin/reset-password/${token}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        return;
      }

      setSuccess(data.message);

      setTimeout(() => {
        navigate("/admin/login");
      }, 2000);
    } catch (error) {
      setError("Failed to reset password");
    }
  };

  return (
    <section className="admin-login-page">
      <div className="admin-login-card">
        <h1>Reset Password</h1>

        {error && (
          <div className="admin-login-error">{error}</div>
        )}

        {success && (
          <div className="admin-login-success">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="admin-input-group">
            <input
              type="password"
              placeholder="New Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.target.value,
                })
              }
            />
          </div>

          <div className="admin-input-group">
            <input
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  confirmPassword: e.target.value,
                })
              }
            />
          </div>

          <button type="submit">
            Reset Password
          </button>
        </form>
      </div>
    </section>
  );
}

export default ResetPassword;