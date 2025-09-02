import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styling/CSS/AuthPages.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleCreateAccountClick = () => {
    navigate("/create-account");
  };

  const handleLoginClick = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/signin/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (!data.message) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } else {
        console.log("Signin success:", data);

        alert(`Signing for ${email}`);
        navigate("/dash");
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <h1 className="auth-title">Sign In</h1>

        <form>
          <label>Email</label>
          <input
            type="email"
            className="input-field"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            className="input-field"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="text-link">
            <a href="#">Forgot your password?</a>
          </div>

          <button
            type="button"
            className="button-primary"
            onClick={handleLoginClick}
          >
            Login
          </button>

          <button
            type="button"
            className="button-secondary mt-2"
            onClick={handleCreateAccountClick}
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
