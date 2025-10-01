import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "./../Data";

import Top from "./../Styling/Top";
import Sidebar from "./../Styling/Sidebar";

import "bulma/css/bulma.min.css";
import "../Styling/CSS/Pages.css";

function Account() {
  const navigate = useNavigate();
  const { account, setAccount } = useData();
  /*
  const account = {
    first_name: "Ivan",
    last_name: "Bezuidenhout",
    email: "Ivan.Bezuidenhout2@gmail.com",
  };
  const setAccount = console.error;
  */

  const signOut = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/signout/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({}),
      });

      const data = await response.json();

      if (!response.ok) {
        if (!data.message) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } else {
        setAccount(null);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    if (account === null) {
      navigate("/login");
    }
  }, [account, navigate]);

  return (
    <>
      <Top />
      <div className="panel-bottom">
        <Sidebar curWindow="" />
        <div className="panel-bottom account-page">
          <span className="text account-detail">
            <strong>First Name:</strong> {account.first_name}
          </span>
          <span className="text account-detail">
            <strong>Last Name:</strong> {account.last_name}
          </span>
          <span className="text account-detail">
            <strong>Email:</strong> {account.email}
          </span>
          <button className="button">Update Password</button>

          <button className="button signout" onClick={signOut}>
            Signout
          </button>
        </div>
      </div>
    </>
  );
}
export default Account;
