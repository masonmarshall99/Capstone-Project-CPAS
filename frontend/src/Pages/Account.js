import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { useData } from "./../Data";
import Cookies from "js-cookie";

import Top from "./../Styling/Top";
import Sidebar from "./../Styling/Sidebar";

import "bulma/css/bulma.min.css";
import "../Styling/CSS/Pages.css";

import { useAuth } from "../CheckAuth";

function Account() {
  const navigate = useNavigate();

  const { loading, user, isAuthenticated } = useAuth();

  /* Edit details */
  const [isEdit, setIsEdit] = useState(false);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);

  const handleSave = async () => {
    if (user !== null) {
      const obj = {
        ...(firstName ? { firstname: firstName } : {}),
        ...(lastName ? { lastname: lastName } : {}),
      };

      console.log(JSON.stringify(obj));
      try {
        const response = await fetch("http://localhost:8000/api/edit-user/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        });
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }
  };

  function edit(detail) {
    setIsEdit(true);
    if (detail == "firstName") {
      setFirstName(user.first_name);
    } else if (detail == "lastName") {
      setLastName(user.last_name);
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

  useEffect(() => {
    if (user == null) {
      navigate("/dash");
    }
  }, [user, navigate]);

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
                    {firstName ?? user.first_name}
                  </span>
                ) : (
                  <span>{user.first_name}</span>
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
                    {lastName ?? user.last_name}
                  </span>
                ) : (
                  <span>{user.last_name}</span>
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
            <strong>Email:</strong> {user.email}
          </span>
          <button className="button">Update Password</button>

          <button className="button signout" onClick={handleSave}>
            Signout
          </button>
        </div>
      </div>
    </>
  );
}
export default Account;
