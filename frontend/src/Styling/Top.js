import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "bulma/css/bulma.min.css";
import "./CSS/Dash.css";
import { useData } from "./../Data";

function Top() {
  const navigate = useNavigate();
  const { account, setAccount } = useData();

  function toAccount() {
    if (account !== null) {
      navigate("/account");
    } else {
      navigate("/login");
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
