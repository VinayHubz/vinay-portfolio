import React, { useState } from "react";
import "./Navbar.css";

const Navbar = ({ active, setActive }) => {
  const [open, setOpen] = useState(false); // mobile menu open/close

  const handleMenuClick = (section) => {
    setActive(section);
    setOpen(false); // close drawer on click
  };

  return (
    <>
      {/* MOBILE TOP NAVBAR */}
      <div className="mobile-header">
        <button
          className="hamburger"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

        <h2 className="mobile-title">Portfolio</h2>
      </div>

      {/* OVERLAY (visible only when menu open) */}
      {open && <div className="overlay" onClick={() => setOpen(false)} />}

      {/* SIDEBAR */}
      <div className={`sidebar ${open ? "open" : ""}`}>
        <h2 className="sidebar-title">Portfolio</h2>

        <ul className="sidebar-menu">

          <li
            className={active === "home" ? "active" : ""}
            onClick={() => handleMenuClick("home")}
          >
            <img src={require("../assets/home.png")} alt="Home" />
            <span>Home</span>
          </li>

          <li
            className={active === "skills" ? "active" : ""}
            onClick={() => handleMenuClick("skills")}
          >
            <img src={require("../assets/skills.png")} alt="Skills" />
            <span>Skills</span>
          </li>

          <li
            className={active === "projects" ? "active" : ""}
            onClick={() => handleMenuClick("projects")}
          >
            <img src={require("../assets/projects.png")} alt="Projects" />
            <span>Projects</span>
          </li>

          <li
            className={active === "contact" ? "active" : ""}
            onClick={() => handleMenuClick("contact")}
          >
            <img src={require("../assets/contact.png")} alt="Contact" />
            <span>Contact</span>
          </li>

          <li
            className={active === "resume" ? "active" : ""}
            onClick={() => handleMenuClick("resume")}
          >
            <img src={require("../assets/resume.png")} alt="Resume" />
            <span>Resume</span>
          </li>

          <li
            className={active === "career" ? "active" : ""}
            onClick={() => handleMenuClick("career")}
          >
            🗺️ Career
          </li>

        </ul>
      </div>
    </>
  );
};

export default Navbar;

