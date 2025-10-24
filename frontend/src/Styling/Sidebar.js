import React from "react";
import { useNavigate } from "react-router-dom";
import "bulma/css/bulma.min.css";
import "./CSS/Light.css";

import { ReactComponent as historicalIcon } from "./Icons/Historical.svg";
import { ReactComponent as diseaseIcon } from "./Icons/Disease.svg";
import { ReactComponent as contactIcon } from "./Icons/Contact.svg";
import { ReactComponent as helpIcon } from "./Icons/Help.svg";
import { ReactComponent as feedbackIcon } from "./Icons/Feedback.svg";
import { ReactComponent as faqIcon } from "./Icons/faq.svg";
import { ReactComponent as fileIcon} from "./Icons/File.svg";
import { ReactComponent as downloadIcon} from "./Icons/download.svg";

function Sidebar({ curWindow }) {
  const navigate = useNavigate();

  const options = [
    { icon: historicalIcon, text: "Historical Analysis", route: "/historical" },
    { icon: diseaseIcon, text: "Disease Risk", route: "/disease" },
    { icon: downloadIcon, text: "Download Data", route: "/download" },
    { icon: fileIcon, text: "File Upload", route: "/fileupload" },
    { icon: faqIcon, text: "FAQ", route: "/faq" },
    { icon: helpIcon, text: "Help & Navigation", route: "/help" },
    { icon: feedbackIcon, text: "Feedback", route: "/Feedback" },
    { icon: contactIcon, text: "Contact Us", pos: "Bottom", route: "/contact" },
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
