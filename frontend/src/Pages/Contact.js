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

          <div className="map-container" style={{ marginTop: "2rem", textAlign: "left" }}>
            <h2 className="contact-title" style={{ marginBottom: "1rem" }}>
              Find Us Here
            </h2>
            <iframe
              title="Curtin University Perth Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2670.277409285839!2d115.89198247659064!3d-32.00330897399559!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2a32bc8b6f5e84d1%3A0x987b1b81f6f9a3b5!2s304%2F304%20Brand%20Dr%2C%20Bentley%20WA%206102!5e0!3m2!1sen!2sau!4v1696508654123!5m2!1sen!2sau"
              width="100%"
              height="400"
              style={{ border: 0, borderRadius: "10px" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div> 

      </div>
      </div>
    </>
  );
}

export default Contact;
