import React from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "./../Data";

import Top from "./../Styling/Top";
import Sidebar from "./../Styling/Sidebar";

import "bulma/css/bulma.min.css";
import "./../Styling/CSS/Pages.css";

function Dash() {
  /* Testing items */
  const items = [];
  const { dash, setDash } = useData();

  for (let i = 0; i < dash; i++) {
    items.push(
      <div key={i} style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
        Dash Item {i + 1}
      </div>
    );
  }

  /* Find things to add to dash */
  function addDash() {
    setDash(dash + 1);
  }

  return (
    <>
      <Top />
      <div className="panel-bottom">
        <Sidebar curWindow="Dashboard" />

        <div style={{ flex: 1, fontWeight: 600, padding: "1.15rem" }}>
          Dashboard
        </div>
        <button className="add-to-dash is-fullwidth" onClick={addDash}>
          +
        </button>
        <div className="scroll-overlay"> {items}</div>
      </div>
    </>
  );
}

export default Dash;
