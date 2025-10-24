import React from "react";
import Top from "./../Styling/Top";
import Sidebar from "./../Styling/Sidebar";

import "bulma/css/bulma.min.css";
import "./../Styling/CSS/Pages.css";

function Contact() {
  const contacts = [
    {
      title: "Phone",
      details: ["+61 0 0000 0000", "+61 0 0000 0000"]
    },
    {
      title: "Email",
      details: ["xx@xxxxxx.com", "xx@xxxxxx.com"]
    },
    {
      title: "Address",
      details: ["304/304 Brand Dr", "Bentley, WA 6102", "Australia"]
    }
  ];

  return (
    <>
      <title>Contact Us</title>
      <Top />
      <div className="panel-bottom">
        <Sidebar curWindow="Contact Us" />

        <div className="rows mx-auto mt-3" style={{ flex: 1, padding: "1rem" }}>
          <p className="is-size-3 has-text-weight-bold mb-3 has-text-left">
            Contact Us
          </p>

          <p className="contact-subtext mb-5">
            We’d love to hear from you! Whether you have a question, feedback, 
            or need support, here’s how you can reach us:
          </p>

          <div className="columns is-multiline is-variable is-4 is-flex-wrap-wrap">
            {contacts.map((contact, index) => (
              <div className="column is-4" key={index}>
                <div
                  className="box has-text-left"
                  style={{
                    minHeight: "180px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center"
                  }}
                >
                  <p className="is-size-5 has-text-weight-semibold">{contact.title}</p>
                  <div className="mt-2">
                    {contact.details.map((detail, idx) => (
                      <p key={idx}>{detail}</p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="box mt-4">
            <p className="is-size-5 has-text-weight-semibold mb-3">Find Us Here</p>
            <iframe
              title="CPAS Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2670.277409285839!2d115.89198247659064!3d-32.00330897399559!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2a32bc8b6f5e84d1%3A0x987b1b81f6f9a3b5!2s304%2F304%20Brand%20Dr%2C%20Bentley%20WA%206102!5e0!3m2!1sen!2sau!4v1696508654123!5m2!1sen!2sau"
              width="100%"
              height="400"
              style={{ borderRadius: "10px" }}
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
