import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styling/CSS/LoadingPage.css";

const LoadingPage = () => {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate("/create-account");
  };

  const handleSignInClick = (e) => {
    e.preventDefault();
    navigate("/account");
  };

  return (
    <div className="loading-wrapper">
      <div className="loading-container">
        <div className="logo-section"></div>

        <p className="welcome-text">
          Welcome to Crop Protection Analytics – smarter insights for healthier
          crops
        </p>

        <button className="button-primary" onClick={handleSignUpClick}>
          SIGN UP
        </button>

        <p className="account-text">
          Already have an Account?{" "}
          <a href="/account" onClick={handleSignInClick}>
            SIGN IN
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoadingPage;
