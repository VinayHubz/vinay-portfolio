// src/App.js
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Resume from "./components/Resume";
import Career from "./components/Career";
import FeedbackModal from "./components/FeedbackModal"; // external component
import "./App.css";

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
      case "resume":
        return <Resume setActive={setActive} />;
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
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 80 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="page-body"
          >
            {renderSection()}
          </motion.div>
        </AnimatePresence>
      </main>

      <FeedbackModal open={feedbackOpen} onClose={() => setFeedbackOpen(false)} />
    </div>
  );
}

export default App;

