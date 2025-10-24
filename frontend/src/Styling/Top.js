import React from "react";
import { useNavigate } from "react-router-dom";
import "bulma/css/bulma.min.css";
import "./CSS/Dash.css";
import { useAuth } from "../CheckAuth";

function Top() {
  const navigate = useNavigate();
  const { loading, user } = useAuth();

  function toAccount() {
    if (user == null) {
      navigate("/login");
    } else {
      navigate("/account");
    }
  }

  return (
    <div // Create top pannel //
      style={{
        height: "42px",
        width: "100%",
        display: "flex",
        backgroundColor: "var(--primary-color)",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingRight: "8px",
      }}
    >
      <button // Create account Button //
        onClick={toAccount}
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          backgroundColor: "var(--panel-colour)",
          color: "white",
          border: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          fontSize: "1rem",
        }}
      >
        👤
      </button>
    </div>
  );
}
export default Top;
