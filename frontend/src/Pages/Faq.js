import React from "react";
import Top from "./../Styling/Top";
import Sidebar from "./../Styling/Sidebar";

import "bulma/css/bulma.min.css";
import "./../Styling/CSS/Pages.css";

function FAQ() {
  const faqs = [
    {
      question: "What is CPAS?",
      answer:
        "CPAS (Crop Production and Analysis System) is a decision support tool designed to help farmers and researchers assess crop risks, disease impacts, and production costs."
    },
    {
      question: "Can I export my analysis?",
      answer:
        "Yes, CPAS allows exporting data in multiple formats such as CSV or PDF so that you can share results with colleagues."
    },
    {
      question: "Can I use CPAS offline?",
      answer:
        "No, CPAS requires an internet connection because it relies on cloud-based data processing and the central database."
    },
    {
      question: "Who do I contact for support?",
      answer:
        "If you experience issues, please reach out to the support team via the 'Contact Us' page."
    }
  ];

  return (
    <>
      <title>FAQ</title>
      <Top />
      <div className="panel-bottom">
        <Sidebar curWindow="Frequently Asked Questions" />
        <div className="rows mx-auto mt-3" style={{ flex: 1, padding: "1rem" }}>
          <div className="is-flex is-flex-direction-column">
            <p className="is-size-4 mb-3">Frequently Asked Questions</p>

            {faqs.map((faq, index) => (
              <div className="box mb-4" key={index}>
                <p className="is-size-5 has-text-weight-semibold">
                  {faq.question}
                </p>
                <p className="mt-2">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default FAQ;
