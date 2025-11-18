import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import "./Resume.css";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase"; // path must be correct

function Resume({ setActive }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      // --- 1) GET ACCURATE USER LOCATION USING IPINFO.IO ---
      const locationData = await fetch(
        "https://ipinfo.io/json?token=YOUR_TOKEN_HERE"
      )
        .then((res) => res.json())
        .catch(() => null);

      const userLocation = {
        ip: locationData?.ip || "unknown",
        city: locationData?.city || "unknown",
        region: locationData?.region || "unknown",
        country: locationData?.country || "unknown",
        coordinates: locationData?.loc || "unknown", // lat,long
      };

      // --- 2) SAVE USER DETAILS TO FIRESTORE ---
      await addDoc(collection(db, "resumeRequests"), {
        name: name,
        email: email,
        location: userLocation,
        timestamp: new Date().toISOString(),
      });

      console.log("Saved to Firestore");

      // --- 3) SEND RESUME USING EMAILJS ---
      const templateParams = {
        from_name: name,
        to_email: email,
        resume_link:
          "https://raw.githubusercontent.com/username/portfolio-resume/main/resume.pdf",
      };

      await emailjs.send(
        "service_1h738n5",
        "template_wc9tkqg",
        templateParams,
        "LACorTHlpdAlSm0dS"
      );

      setMessage("Resume sent successfully!");
    } catch (error) {
      console.error("Error:", error);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      setName("");
      setEmail("");
    }
  };

  return (
    <div className="resume-section">
      <h1 className="resume-title">Download My Resume</h1>
      <p className="resume-sub">
        Enter your details to receive my resume directly by email.
      </p>

      <form className="resume-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit" className="resume-button" disabled={loading}>
          {loading ? "Sending..." : "Send Resume"}
        </button>
      </form>

      {message && <p className="success-msg">{message}</p>}

      <p className="skip-text">Don't want to enter details?</p>

      <button className="skip-btn" onClick={() => setActive("contact")}>
        Contact Me Instead
      </button>
    </div>
  );
}

export default Resume;

