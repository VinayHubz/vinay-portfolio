// src/App.js
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Resume from "./components/Resume";
import Career from "./components/Career";
import "./App.css";

function FeedbackModal({ open, onClose }) {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");

  if (!open) return null;

  return (
    <div className="feedback-overlay" onClick={onClose}>
      <div className="feedback-modal" onClick={(e) => e.stopPropagation()}>
        <button className="feedback-close" onClick={onClose}>✕</button>
        <h3>Send a quick message</h3>

        <div style={{ marginBottom: 12 }}>
          <div style={{ display: "flex", gap: 8 }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <button
                key={i}
                onClick={() => setRating(i)}
                style={{
                  background: i <= rating ? "#ffc107" : "#e2e8f0",
                  border: "none",
                  borderRadius: 6,
                  width: 34,
                  height: 34,
                  cursor: "pointer",
                }}
              >
                {i <= rating ? "★" : "☆"}
              </button>
            ))}
          </div>
        </div>

        <textarea
          placeholder="How can I improve? (optional)"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            width: "100%",
            minHeight: 110,
            padding: 12,
            borderRadius: 8,
            border: "1px solid #e6eefc",
          }}
        />

        <div style={{ textAlign: "right", marginTop: 12 }}>
          <button
            onClick={() => {
              alert("Thanks for the feedback!");
              setRating(0);
              setText("");
              onClose();
            }}
            style={{
              background: "#1277ff",
              color: "#fff",
              border: "none",
              padding: "10px 14px",
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [active, setActive] = useState("home");
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  const renderSection = () => {
    switch (active) {
      case "home":
        return <Home openFeedback={() => setFeedbackOpen(true)} />;

      case "skills":
        return <Skills />;

      case "projects":
        return <Projects />;

      case "contact":
        return <Contact />;

     case "resume": return <Resume setActive={setActive} />;



      case "career":
        return <Career />;

      default:
        return <Home openFeedback={() => setFeedbackOpen(true)} />;
    }
  };

  return (
    <div className="app-root">
      <Navbar active={active} setActive={setActive} />

      <main className="main-content">
        <div className="page-body">{renderSection()}</div>
      </main>

      <FeedbackModal open={feedbackOpen} onClose={() => setFeedbackOpen(false)} />
    </div>
  );
}

export default App;

