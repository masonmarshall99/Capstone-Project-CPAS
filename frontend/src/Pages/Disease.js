import React from "react";
import { useNavigate } from "react-router-dom";

import Top from "./../Styling/Top";
import Sidebar from "./../Styling/Sidebar";

import "bulma/css/bulma.min.css";
import "./../Styling/CSS/Pages.css";

function Disease() {
  return (
    <>
      <Top />
      <div className="panel-bottom">
        <Sidebar curWindow="Disease Risk" />
        <div style={{ flex: 1, padding: "1rem" }}>Disease content area</div>
      </div>
    </>
  );
}

export default Disease;
