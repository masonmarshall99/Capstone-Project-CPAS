import React from "react";
import { useNavigate } from "react-router-dom";
import "bulma/css/bulma.min.css";
import Top from "./../Styling/Top";
import Sidebar from "./../Styling/Sidebar";

function Dash() {
  return (
    <>
      <Top />
      <div
        style={{
          display: "flex",
          height: `100%`,
          gap: "12px",
        }}
      >
        <Sidebar curWindow="Dashboard" />
        <div style={{ flex: 1, padding: "1rem" }}>Dash content area</div>
      </div>
    </>
  );
}

export default Dash;
