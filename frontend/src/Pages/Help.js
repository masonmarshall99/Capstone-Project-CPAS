import React from "react";
import Top from "./../Styling/Top";
import Sidebar from "./../Styling/Sidebar";

import "bulma/css/bulma.min.css";
import "./../Styling/CSS/Pages.css";

function Help() {
  return (
    <>
      <title>Help & Navigation</title>
      <Top />

      <div className="panel-bottom">
        <Sidebar curWindow="Help" />

        <div className="rows mx-auto mt-3">

          {/* Page Heading */}
          <div className="row mb-5">
            <h1 className="is-size-2 has-text-weight-bold">Help & Navigation</h1>
            <p className="is-size-5 mt-2">
              Welcome to our website! This page will help you understand how to use and navigate the platform.
            </p>
          </div>

          {/* Navigation Section */}
          <div className="row mb-5">
            <h2 className="is-size-4 has-text-weight-semibold mb-3">Navigation</h2>
            <div className="box">
              <ul className="content">
                <li><strong>Historical Analysis:</strong> Explore past data trends and reports.</li>
                <li><strong>Disease Risk:</strong> Assess disease impact and related estimates.</li>
                <li><strong>FAQ:</strong> Frequently asked questions about using the platform.</li>
                <li><strong>Help & Nav:</strong> Guidance on navigating and using the website.</li>
                <li><strong>Contact Us:</strong> Reach out to our support team for assistance.</li>
              </ul>
            </div>
          </div>

          {/* How to Use Section */}
          <div className="row mb-5">
            <h2 className="is-size-4 has-text-weight-semibold mb-3">How to Use</h2>
            <div className="box">
              <ol className="content">
                <li>how to use section............</li>
              </ol>
            </div>
          </div>

          {/* Need More Help Section */}
          <div className="row mb-5">
            <h2 className="is-size-4 has-text-weight-semibold mb-3">Need More Help?</h2>
            <div className="box">
              <p>
                If you have further questions, please visit the{" "}
                <a href="/contact" className="has-text-link">Contact Page</a> or reach out to our support team.
              </p>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default Help;
