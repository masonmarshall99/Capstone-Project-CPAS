import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "bulma/css/bulma.min.css";
import "./CSS/Dash.css";

import { ReactComponent as historicalIcon } from "./Icons/Historical.svg";
import { ReactComponent as diseaseIcon } from "./Icons/Disease.svg";
import { ReactComponent as contactIcon } from "./Icons/Contact.svg";
import { ReactComponent as helpIcon } from "./Icons/Help.svg";
import { ReactComponent as faqIcon } from "./Icons/faq.svg";

function Sidebar({ curWindow }) {
  const navigate = useNavigate();

  const options = [
    { icon: historicalIcon, text: "Historical Analysis", route: "/historical" },
    { icon: diseaseIcon, text: "Disease Risk", route: "/disease" },
    { icon: faqIcon, text: "FAQ", route: "/faq" },
    { icon: helpIcon, text: "Help & Navigation", route: "/help" },
    { icon: feedbackIcon, text: "Feedback", route: "/Feedback" },
    { icon: contactIcon, text: "Contact Us", pos: "Bottom", route: "/contact" },
  ];

  return (
    // First create the pannel on side //
    <div className="panel-side is-radiusless">
      {options.map(({ icon: Icon, text: Text, pos, route }) => (
        <Link
          to={route}
          key={Text}
          className={[
            "button is-link is-fullwidth panel-side-button",
            curWindow === Text ? "active" : "",
            pos === "Bottom" ? "bottom" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          onClick={() => navigate(route)}
        >
          <span className="icon">
            <Icon />
          </span>
          <span className="text" style={{ fontWeight: 600 }}>
            {Text}
          </span>
        </Link>
      ))}
    </div>
  );
}
export default Sidebar;
