import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styling/CSS/AuthPages.css";

import { useData } from "./../Data";
import Cookies from "js-cookie";

const CreateAccountPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const { account, setAccount } = useData();

  const navigate = useNavigate();


  const handleSignUp = async (e) => {
    if (account == null) {
      e.preventDefault();

      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }

    try {
      const response = await fetch("http://localhost:8000/api/register/", {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": Cookies.get("csrftoken"),
        },
        body: JSON.stringify({ email, name, lastName, password }),
      });

        const data = await response.json();

        if (!response.ok) {
          if (data.message) {
            setMessage(data.message);
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        } else {
          console.log("Signup success:", data);

          setAccount(data);

          alert(`Account created for ${email}`);
          setMessage("");
          navigate("/dash");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setMessage("Sign up failed. Please try again.");
      }
    }
  };

  function handleChange() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    if (password && confirmPassword && password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setMessage("");
  }

  useEffect(() => {
    handleChange();
  }, [email, password, confirmPassword]);

  /* Redirect if signed in */
  useEffect(() => {
    if (account !== null) {
      navigate("/dash");
    }
  }, [account, navigate]);

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <h1 className="auth-title">Create Your Account</h1>

        <form onSubmit={handleSignUp}>
          <input
            type="email"
            className="input-field"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="text"
            className="input-field"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            className="input-field"
            placeholder="Enter your surname"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />

          <input
            type="password"
            className="input-field"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            className="input-field"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          {message && <p className="error-text">{message}</p>}

          <button type="submit" className="button-secondary mt-2">
            Sign Up
          </button>
        </form>

        <p className="auth-switch-text mt-4">
          Already have an account?{" "}
          <span className="auth-link" onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default CreateAccountPage;
