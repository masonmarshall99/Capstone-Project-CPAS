import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "./../Data";

import Top from "./../Styling/Top";
import Sidebar from "./../Styling/Sidebar";

import "bulma/css/bulma.min.css";
import "../Styling/CSS/Pages.css";

function Account() {
  const navigate = useNavigate();
  //const { account, setAccount } = useData();
  //*
  const account = {
    first_name: "Ivan",
    last_name: "Bezuidenhout",
    email: "Ivan.Bezuidenhout2@gmail.com",
  };
  const setAccount = console.error;
  //*/

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

  /* Edit details */
  const [isEdit, setIsEdit] = useState(false);
  const [lastName, setLastName] = useState(null);
  const [firstName, setFirstName] = useState(null);

  function edit(detail) {
    setIsEdit(true);
    if (detail == "firstName") {
      setFirstName(account.first_name);
    } else if (detail == "lastName") {
      setLastName(account.last_name);
    }
  }

  function save(detail, action) {
    setIsEdit(false);

    if (action == "save") {
      console.log(firstName, lastName);
    }

    if (detail == "firstName") {
      setFirstName(null);
    } else if (detail == "lastName") {
      setLastName(null);
    }

    console.log(firstName, lastName);
  }

  return (
    <>
      <Top />
      <div className="panel-bottom">
        <Sidebar curWindow="" />
        <div className="panel-bottom account-page">
          <span className="text title is-5">
            <strong>Account details:</strong>
          </span>

          <nav className="level mb-1">
            <div className="level-left">
              <div className="level-item">
                <span className="text account-detail">
                  <strong>First Name:&nbsp;</strong>
                </span>
                {isEdit ? (
                  <span
                    contentEditable={true}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => setFirstName(e.currentTarget.textContent)}
                  >
                    {firstName ?? account.first_name}
                  </span>
                ) : (
                  <span>{account.first_name}</span>
                )}
              </div>
            </div>
            <div
              className="level-right"
              style={{ display: isEdit ? "none" : "block" }}
            >
              <div className="level-item">
                <button
                  onClick={() => edit("firstName")}
                  className="button is-small edit-button"
                >
                  Edit
                </button>
              </div>
            </div>
            <div
              className="level-right"
              style={{
                display: firstName ? "flex" : "none",
                gap: "0.5rem",
              }}
            >
              <div className="level-item">
                <button
                  onClick={() => save("firstName", "save")}
                  className="button is-small edit-button"
                >
                  Save
                </button>
              </div>
              <div className="level-item">
                <button
                  onClick={() => save("firstName", "cancel")}
                  className="button is-small edit-button"
                >
                  Cancel
                </button>
              </div>
            </div>
          </nav>

          <nav className="level mb-1">
            <div className="level-left">
              <div className="level-item">
                <span className="text account-detail">
                  <strong>Last Name:&nbsp;</strong>
                </span>
                {isEdit ? (
                  <span
                    contentEditable={true}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => setLastName(e.currentTarget.textContent)}
                  >
                    {lastName ?? account.last_name}
                  </span>
                ) : (
                  <span>{account.last_name}</span>
                )}
              </div>
            </div>
            <div
              className="level-right"
              style={{ display: isEdit ? "none" : "block" }}
            >
              <div className="level-item">
                <button
                  onClick={() => edit("lastName")}
                  className="button is-small edit-button"
                >
                  Edit
                </button>
              </div>
            </div>
            <div
              className="level-right"
              style={{
                display: lastName ? "flex" : "none",
                gap: "0.5rem",
              }}
            >
              <div className="level-item">
                <button
                  onClick={() => save("lastName", "save")}
                  className="button is-small edit-button"
                >
                  Save
                </button>
              </div>
              <div className="level-item">
                <button
                  onClick={() => save("lastName", "cancel")}
                  className="button is-small edit-button"
                >
                  Cancel
                </button>
              </div>
            </div>
          </nav>

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
