import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "bulma/css/bulma.min.css";
import "./CSS/Dash.css";

function Top() {
  const navigate = useNavigate();

  function toAccount() {
    navigate("/account");
  }

  return (
    <div className="panel-top is-radiusless">
      <Link
        to={"/account"}
        key={"Account"}
        className="panel-top-account"
        onClick={toAccount}
      >
        👤
      </Link>
    </div>
  );
}
export default Top;
