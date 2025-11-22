import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import "./Resume.css";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

function Resume({ setActive }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 4000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    let userLocation = {
      ip: "unknown",
      city: "unknown",
      region: "unknown",
      country: "unknown",
      coordinates: "unknown",
      readable_address: "Not available (IP-based lookup only)",
    };

    try {
      // ★ LOCATION FETCH WITH FALLBACK
      try {
        const loc = await fetch(
          "https://ipinfo.io/json?token=79d0a2c5727b74"
        ).then((res) => res.json());

        userLocation = {
          ip: loc?.ip || "unknown",
          city: loc?.city || "unknown",
          region: loc?.region || "unknown",
          country: loc?.country || "unknown",
          coordinates: loc?.loc || "unknown",
          readable_address:
            `${loc?.city || ""}, ${loc?.region || ""}, ${loc?.country || ""}`,
        };
      } catch {
        console.warn("Location lookup failed");
      }

      // ★ SAVE TO FIRESTORE
      await addDoc(collection(db, "resumeRequests"), {
        name,
        email,
        location: userLocation,
        timestamp: new Date().toISOString(),
      });

      // ★ EMAILJS
      await emailjs.send(
        "service_1h738n5",
        "template_wc9tkqg",
        {
          from_name: name,
          to_email: email,
          resume_link:
            "https://raw.githubusercontent.com/vinayhubz/portfolio-resume/main/resume.pdf",
        },
        "LACorTHlpdAlSm0dS"
      );

      showMessage("Resume sent successfully!");
      setName("");
      setEmail("");

    } catch (err) {
      console.error("ERROR:", err);
      showMessage("Something went wrong while sending the resume.");
    }

    setLoading(false);
  };

  return (
    <div className="resume-section">
      <h1 className="resume-title">Download My Resume</h1>
      <p className="resume-sub">Enter your details to receive my resume.</p>

      <form className="resume-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="resume-button" disabled={loading}>
          {loading ? "Sending..." : "Send Resume"}
        </button>
      </form>

      {message && <p className="resume-msg">{message}</p>}

      <p className="skip-text">Prefer direct contact?</p>
      <button className="skip-btn" onClick={() => setActive("contact")}>
        Contact Me Instead
      </button>
    </div>
  );
}

export default Resume;

