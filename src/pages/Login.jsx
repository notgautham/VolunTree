import React, { useState } from "react";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // TODO: Implement login logic (AWS Cognito authentication)
    console.log("Logging in with:", email, password);
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <p>Welcome back! Please enter your details to log in.</p>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="forgot-password">
          <a href="/forgot-password">Forgot Password?</a>
        </div>

        <button type="submit" className="login-btn">Log In</button>
      </form>

      <p className="signup-link">
        Don't have an account? <a href="/signup">Sign up</a>
      </p>
    </div>
  );
};

export default Login;
