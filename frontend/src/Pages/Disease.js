import React from "react";
import { useNavigate } from "react-router-dom";
import "bulma/css/bulma.min.css";
import Top from "./../Styling/Top";
import Sidebar from "./../Styling/Sidebar";

function Disease() {
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
        <Sidebar curWindow="Disease Risk" />
        <div style={{ flex: 1, padding: "1rem" }}>Disease content area</div>
      </div>
    </>
  );
}

export default Disease;
