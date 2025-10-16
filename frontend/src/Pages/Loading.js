import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styling/CSS/LoadingPage.css";
import curtinLogo from "../Styling/Icons/Curtin_Logo.jpg";
import { useState } from "react";
import { useAuth } from "../CheckAuth";

const LoadingPage = () => {
  const navigate = useNavigate();
  const { loading, user } = useAuth();

  const handleSignUpClick = () => {
    navigate("/create-account");
  };

  const handleSignInClick = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  const handleGuest = (e) => {
    navigate("/historical");
  };

  /* Redirect if signed in */
  useEffect(() => {
    if (user !== null) {
      navigate("/historical");
    }
  }, [user, navigate]);

  return (
    <div className="loading-wrapper">
      <div className="loading-container">
        <div className="logo-section">
          <h1 className="logo-title">CPAS</h1>
          <img src={curtinLogo} alt="Curtin Logo" className="curtin-logo" />
        </div>

        <p className="welcome-text">
          Welcome to Crop Protection Analytics - smarter insights for healthier
          crops
        </p>

        <button className="button-primary" onClick={handleGuest}>
          GUEST
        </button>

        <button className="button-primary mt-3" onClick={handleSignUpClick}>
          SIGN UP
        </button>

        <p className="account-text">
          Already have an Account?{" "}
          <a href="/login" onClick={handleSignInClick}>
            SIGN IN
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoadingPage;
