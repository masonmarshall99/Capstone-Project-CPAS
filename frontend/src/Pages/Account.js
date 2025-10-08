import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "./../Data";
import Cookies from "js-cookie";

import Top from "./../Styling/Top";
import Sidebar from "./../Styling/Sidebar";

import "bulma/css/bulma.min.css";
import "../Styling/CSS/Pages.css";

function Account() {
  const navigate = useNavigate();
  const { account, setAccount } = useData();

  const signOut = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/logout/", {
        method: "GET",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": Cookies.get("csrftoken"),
        },
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

  /* Edit details */
  const [isEdit, setIsEdit] = useState(false);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);

  const handleSave = async () => {
    if (account !== null) {
      const obj = {
        ...(firstName ? { firstname: firstName } : {}),
        ...(lastName ? { lastname: lastName } : {}),
      };

      try {
        const response = await fetch("http://localhost:8000/api/edit-user/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        });

        const data = await response.json();

        if (!response.ok) {
          if (!data.message) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        } else {
          setAccount(data);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }
  };

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
      handleSave();
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
