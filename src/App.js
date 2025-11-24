// src/App.js
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Resume from "./components/Resume";
import Career from "./components/Career";
import FeedbackModal from "./components/FeedbackModal";
import "./App.css";

// ❤️ Firebase imports
import { db } from "./firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

// 📍 Visitor Tracking Function
function TrackVisitor() {
  useEffect(() => {
    const trackLocation = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();

        await addDoc(collection(db, "visitors"), {
          ip: data.ip || "",
          city: data.city || "",
          region: data.region || "",
          country: data.country_name || "",
          coordinates: `${data.latitude}, ${data.longitude}`,
          location: `${data.city}, ${data.region}`,
          timezone: data.timezone || "",
          org: data.org || "",
          postal: data.postal || "",
          timestamp: serverTimestamp(),
        });
      } catch (error) {
        console.log("Error tracking visitor:", error);
      }
    };

    trackLocation();
  }, []);

  return null;
}

function App() {
  const [active, setActive] = useState("home");
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  const renderSection = () => {
    switch (active) {
      case "home":
        return (
          <Home
            openFeedback={() => setFeedbackOpen(true)}
            setActive={setActive}   // ✅ IMPORTANT FIX
          />
        );

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
        return (
          <Home
            openFeedback={() => setFeedbackOpen(true)}
            setActive={setActive}   // also here
          />
        );
    }
  };

  return (
    <div className="app-root">
      <TrackVisitor />

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

      <FeedbackModal
        open={feedbackOpen}
        onClose={() => setFeedbackOpen(false)}
      />
    </div>
  );
}

export default App;

