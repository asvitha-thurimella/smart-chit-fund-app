import React, { useState } from "react";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    // Retrieve saved user from localStorage
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (
      savedUser &&
      email === savedUser.email &&
      password === savedUser.password
    ) {
      // Login success: save fake auth token
      localStorage.setItem("authToken", "fake-jwt-token");
      // Redirect to dashboard
      window.location.href = "/dashboard";
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-wrapper">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Sign In</h2>

        {error && <div className="login-error">{error}</div>}

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="username"
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />

        <button type="submit">Login</button>

        <p className="signup-text">
          Don't have an account? <a href="/auth/signup">Sign Up</a>
        </p>
      </form>
    </div>
  );
};

export default Login;