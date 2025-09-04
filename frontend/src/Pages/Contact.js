import React from "react";
import { useNavigate } from "react-router-dom";

import Top from "./../Styling/Top";
import Sidebar from "./../Styling/Sidebar";

import "bulma/css/bulma.min.css";
import "./../Styling/CSS/Contact.css";

function Contact() {
  return (
    <>
      <Top />
      <div className="panel-bottom">
        <Sidebar curWindow="Contact Us" />

        <div className="contact-container">
          <h1 className="contact-heading">Contact Us</h1>
          <p className="contact-subtext">
            We’d love to hear from you! Whether you have a question, feedback, 
            or need support, here’s how you can reach us:
          </p>

          <div className="contact-grid">
            <div className="contact-card">
              <h2 className="contact-title">Phone</h2>
              <p className="contact-info">+61 0 0000 0000</p>
              <p className="contact-info">+61 0 0000 0000</p>
            </div>

            <div className="contact-card">
              <h2 className="contact-title">Email</h2>
              <p className="contact-info">xx@xxxxxx.com</p>
              <p className="contact-info">xx@xxxxxx.com</p>
            </div>

            <div className="contact-card">
              <h2 className="contact-title">Address</h2>
              <p className="contact-info">123 Star Street</p>
              <p className="contact-info">Perth, WA 6000</p>
              <p className="contact-info">Australia</p>
            </div>

            <div className="contact-card">
              <h2 className="contact-title">Working Hours</h2>
              <p className="contact-info">Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p className="contact-info">Saturday: 10:00 AM - 2:00 PM</p>
              <p className="contact-info">Sunday: Closed</p>
            </div>
          </div>

      </div>
      </div>
    </>
  );
}

export default Contact;
