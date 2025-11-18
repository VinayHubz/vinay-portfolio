// src/components/Home.js
import React, { useState } from "react";
import "./Home.css";
import ProfileImg from "../assets/profile.png"; // put your profile image here

export default function Home({ openFeedback }) {
  const [showTip, setShowTip] = useState(false);

  const stats = [
    { value: "10+", label: "Data Pipelines Deployed" },
    { value: "4+",  label: "Azure Services Hands-on" },
    { value: "3+",  label: "Years Learning & Projects" },
    { value: "100%",label: "Problem-Solving Mindset" }
  ];

  return (
    <div className="home-root">
      <div className="home-inner">
        <div className="profile-wrap" role="img" aria-label="Vinay profile">
          <img src={ProfileImg} alt="Vinay" className="profile-img" />
        </div>

        <h1 className="home-name">Vinay</h1>
        <h2 className="home-role">Data Engineer &amp; Python Developer</h2>

        <p className="home-bio">
          I'm a Data Engineer who builds reliable, scalable data systems on Azure.
          I focus on clean ETL, automation and enabling data-driven decisions.
        </p>

        <div className="home-stats" aria-hidden>
          {stats.map((s, i) => (
            <div className="stat-card" key={i}>
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating feedback/chat button (bottom right) */}
      <button
        className="feedback-floating-btn"
        onClick={() => { if (openFeedback) openFeedback(); else setShowTip(true); }}
        aria-label="Open feedback"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{marginRight:8}}>
          <path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Feedback
      </button>

      {/* small fallback tooltip if feedback handler missing */}
      {showTip && (
        <div className="feedback-tip" onClick={() => setShowTip(false)}>
          Click the resume or contact module to get in touch.
        </div>
      )}
    </div>
  );
}

