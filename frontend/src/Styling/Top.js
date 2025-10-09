import React from "react";
import { useNavigate, Link } from "react-router-dom";
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
