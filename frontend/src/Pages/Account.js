import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "./../Data";
import Cookies from "js-cookie";

function Account() {
  const navigate = useNavigate();
  const { account, setAccount } = useData();

  const signOut = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/logout/", {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": Cookies.get("csrftoken"),
        },
        body: JSON.stringify({}),
      });

      const data = await response.json();

      if (!response.ok) {
        if (!data.message) {
          throw new Error(`HTTP error! status: ${response.status}`);
        } else {
          console.log("Logout failed: ", data.message); 
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
      <div className="panel-bottom"></div>
      <button className="is-fullwidth" onClick={signOut}>
        Signout
      </button>
    </>
  );
}
export default Account;
