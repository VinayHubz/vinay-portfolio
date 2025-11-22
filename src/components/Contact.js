import React from "react";
import "./Contact.css";

import EmailIcon from "../assets/contact.png";
import LinkedInIcon from "../assets/linkedin.png";
import LocationIcon from "../assets/location.png";

function Contact() {
  return (
    <section className="contact-section">
      <h1 className="contact-title">Get in Touch</h1>

      <p className="contact-subtitle">
        Let’s connect professionally — I’m always open to new challenges and
        collaborations.
      </p>

      <div className="contact-list">

        {/* Email */}
        <div className="contact-row">
          <img src={EmailIcon} alt="email icon" className="contact-icon" />
          <a href="mailto:vinaysai141@gmail.com" className="contact-text">
            vinaysai141@gmail.com
          </a>
        </div>

        {/* LinkedIn */}
        <div className="contact-row">
          <img src={LinkedInIcon} alt="linkedin icon" className="contact-icon" />
          <a
            href="https://www.linkedin.com/in/vinay--dataengineer/"
            target="_blank"
            className="contact-text"
          >
            Linkedin.com/in/vinay-DataEngineer
          </a>
        </div>

        {/* Location */}
        <div className="contact-row">
          <img src={LocationIcon} alt="location icon" className="contact-icon" />
          <span className="contact-text">Hyderabad, India</span>

          <span className="relocate-badge">Willing to Relocate</span>
        </div>

      </div>
    </section>
  );
}

export default Contact;

