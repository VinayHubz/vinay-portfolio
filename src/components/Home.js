import React, { useState } from "react";
import "./Home.css";
import ProfileImg from "../assets/profile.png";

export default function Home({ openFeedback, setActive }) {
  const [showTip, setShowTip] = useState(false);

  const stats = [
    { value: "10+", label: "Pipelines Deployed" },
    { value: "4+", label: "Azure Services Hands-on" },
    { value: "3+", label: "Years Learning & Projects" },
    { value: "100%", label: "Problem-Solving Mindset" }
  ];

  return (
    <section className="home-root">

      {/* TOP-RIGHT BUTTON */}
      <div className="resume-btn-container">
        <button
          className="download-resume-btn"
          onClick={() => setActive("resume")}
        >
          Resume
        </button>
      </div>

      <div className="home-inner">
        <div className="profile-wrap">
          <img src={ProfileImg} alt="Vinay" className="profile-img" />
        </div>

        <h1 className="home-name">Vinay</h1>
        <h2 className="home-role">Data Engineer & Python Developer</h2>

        <p className="home-bio">
          I build scalable data systems on Azure, specializing in ETL pipelines,
          automation, and data-driven decision making.
        </p>

        <div className="home-stats">
          {stats.map((s, i) => (
            <div className="stat-card float-b" key={i}>
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <button
        className="feedback-btn"
        onClick={() => openFeedback ? openFeedback() : setShowTip(true)}
      >
        Feedback
      </button>

      {showTip && (
        <div className="feedback-tip" onClick={() => setShowTip(false)}>
          Click Resume or Contact to message me.
        </div>
      )}
    </section>
  );
}

