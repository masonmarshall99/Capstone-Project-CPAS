import React from "react";
import { useNavigate } from "react-router-dom";

import Top from "./../Styling/Top";
import Sidebar from "./../Styling/Sidebar";

import "bulma/css/bulma.min.css";
import "./../Styling/CSS/Pages.css";

function Contact() {
  return (
    <>
      <Top />
      <div className="panel-bottom">
        <Sidebar curWindow="Contact Us" />

        <div style={{ flex: 1, padding: "1rem" }}>Contact content area</div>
      </div>
    </>
  );
}

export default Contact;
