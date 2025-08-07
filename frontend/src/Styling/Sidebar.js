import React from "react";
import { useNavigate } from "react-router-dom";
import "bulma/css/bulma.min.css";
import "./CSS/Light.css";

import { ReactComponent as dashIcon } from "./Icons/Dash.svg";
import { ReactComponent as historicalIcon } from "./Icons/Historical.svg";
import { ReactComponent as diseaseIcon } from "./Icons/Disease.svg";

function Sidebar({ curWindow }) {
  const navigate = useNavigate();

  const options = [
    { icon: dashIcon, text: "Dashboard", route: "/dash" },
    { icon: historicalIcon, text: "Historical Analysis", route: "/historical" },
    { icon: diseaseIcon, text: "Disease Risk", route: "/disease" },
  ];

  return (
    // First create the pannel on side //
    <div>
      <div
        style={{
          width: "220px",
          height: `calc(100vh - 42px)`,
          backgroundColor: "var(--panel-colour)",
          padding: "1rem",
        }}
      >
        {options.map(({ icon: Icon, text, route }) => (
          <button // Then loop and make buttons //
            key={text}
            className="button is-link is-fullwidth is-flex is-align-items-center"
            style={{
              backgroundColor:
                curWindow == text
                  ? "var(--primary-color-fadded)"
                  : "var(--panel-colour)",
              justifyContent: "flex-start",
              paddingLeft: "18px",
              marginBottom: "4px",
            }}
            onClick={() => navigate(route)}
          >
            <span className="icon" style={{ marginRight: "8px" }}>
              <Icon // Create icon //
                style={{
                  width: "1.5em",
                  height: "1.5em",
                  fill:
                    curWindow == text
                      ? "var(--primary-color)"
                      : "var(--text-color)",
                }}
              />
            </span>
            <span // Create text //
              style={{
                color:
                  curWindow == text
                    ? "var(--primary-color)"
                    : "var(--text-color)",
                marginTop: "4px",
              }}
            >
              {text}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
export default Sidebar;
