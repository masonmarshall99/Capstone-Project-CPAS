import React from "react";
import Top from "./../Styling/Top";
import Sidebar from "./../Styling/Sidebar";
import CurtinLogo from "../Styling/Icons/Curtin_Logo.jpg";

import "bulma/css/bulma.min.css";
import "./../Styling/CSS/Pages.css";

function Feedback() {
  return (
    <>
      <title>Feedback</title>
      <Top />

      <div className="panel-bottom">
        <Sidebar curWindow="Feedback" />

        <div className="rows mx-auto mt-3">

          {/* Page Heading */}
          <div className="row mb-5 has-text-centered">
            <img
              src={CurtinLogo}
              alt="Curtin University Logo"
              style={{ width: "400px", marginBottom: "1rem" }}
            />
            <h1 className="is-size-2 has-text-weight-bold has-text-left">Feedback : </h1>
          </div>

          {/* Feedback Form Section update feedback link with clients mail*/}
          <div className="row mb-5">
            <div className="box has-text-centered" style={{ overflow: "hidden" }}>
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSfrbCUTVtm6TNGLV764lYW8W9tqGN07ZhriVZKVNU9ftKIU9A/viewform?embedded=true"
                width="900"
                height="1100"
                title="Feedback Form"
                style={{ border: "none" }}
              >
                Loading…
              </iframe>
            </div>
          </div>

          {/* Contact Section */}
          <div className="row mb-5">
            <h2 className="is-size-4 has-text-weight-semibold mb-3">Need Assistance?</h2>
            <div className="box">
              <p>
                If you encounter any issues with the form or have further questions, please visit our{" "}
                <a href="/contact" className="has-text-link">Contact Page</a> to reach out to the support team.
              </p>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default Feedback;
