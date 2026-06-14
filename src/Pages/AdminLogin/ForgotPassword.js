import React, { useState } from "react";
import API_BASE_URL from "../../api/api";
import "./AdminLogin.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch(
        `${API_BASE_URL}/admin/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        return;
      }

      setMessage(data.message);
      setError("");
    } catch (error) {
      setError("Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="admin-login-page">
      <div className="admin-login-card">
        <h1>Forgot Password</h1>

        <p>Enter admin email to receive reset link.</p>

        {error && <div className="admin-login-error">{error}</div>}

        {message && (
          <div className="admin-login-success">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="admin-input-group">
            <input
              type="email"
              placeholder="Admin Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading
              ? "Sending..."
              : "Send Reset Link"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default ForgotPassword;