import React from "react";
import { useNavigate } from "react-router-dom";
import "bulma/css/bulma.min.css";
import Top from "./../Styling/Top";
import Sidebar from "./../Styling/Sidebar";

function Historical() {
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
        <Sidebar curWindow="Historical Analysis" />
        <div style={{ flex: 1, padding: "1rem" }}>Historical content area</div>
      </div>
    </>
  );
}

export default Historical;
