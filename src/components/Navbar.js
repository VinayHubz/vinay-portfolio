import React from "react";
import "./Navbar.css";

const Navbar = ({ active, setActive }) => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Portfolio</h2>

      <ul className="sidebar-menu">

        <li
          className={active === "home" ? "active" : ""}
          onClick={() => setActive("home")}
        >
          <img src={require("../assets/home.png")} alt="Home" />
          <span>Home</span>
        </li>

        <li
          className={active === "skills" ? "active" : ""}
          onClick={() => setActive("skills")}
        >
          <img src={require("../assets/skills.png")} alt="Skills" />
          <span>Skills</span>
        </li>

        <li
          className={active === "projects" ? "active" : ""}
          onClick={() => setActive("projects")}
        >
          <img src={require("../assets/projects.png")} alt="Projects" />
          <span>Projects</span>
        </li>

        <li
          className={active === "contact" ? "active" : ""}
          onClick={() => setActive("contact")}
        >
          <img src={require("../assets/contact.png")} alt="Contact" />
          <span>Contact</span>
        </li>

        <li
          className={active === "resume" ? "active" : ""}
          onClick={() => setActive("resume")}
        >
          <img src={require("../assets/resume.png")} alt="Resume" />
          <span>Resume</span>
        </li>

        <li
          className={active === "career" ? "active" : ""}
          onClick={() => setActive("career")}
        >
          🗺️ Career
        </li>

      </ul>
    </div>
  );
};

export default Navbar;

