import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import "./Resume.css";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

function Resume({ setActive }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusType, setStatusType] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  const showMessage = (msg, type = "success") => {
    setMessage(msg);
    setStatusType(type);
    setTimeout(() => {
      setMessage("");
      setStatusType("");
    }, 4000);
  };

  const onSubmitClick = (e) => {
    e.preventDefault();

    const emailPattern =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!emailPattern.test(email.trim())) {
      showMessage("Invalid email format. Try Again!", "error");
      return;
    }

    setShowConfirm(true);
  };

  const handleSendResume = async () => {
    setShowConfirm(false);
    setLoading(true);

    let userLocation = {
      ip: "",
      city: "",
      region: "",
      country: "",
      postal: "",
      org: "",
      timezone: "",
      latitude: "",
      longitude: "",
      coordinates: "",
      readable_address: "",
    };

    try {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();

        userLocation = {
          ip: data.ip || "",
          city: data.city || "",
          region: data.region || "",
          country: data.country_name || "",
          postal: data.postal || "",
          org: data.org || "",
          timezone: data.timezone || "",
          latitude: data.latitude || "",
          longitude: data.longitude || "",
          coordinates: `${data.latitude}, ${data.longitude}`,
          readable_address: `${data.city}, ${data.region}, ${data.country_name}`,
        };
      } catch {}

      await addDoc(collection(db, "resumeRequests"), {
        name,
        email,
        city: userLocation.city,
        region: userLocation.region,
        country: userLocation.country,
        ip: userLocation.ip,
        postal: userLocation.postal,
        org: userLocation.org,
        timezone: userLocation.timezone,
        coordinates: userLocation.coordinates,
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        readable_address: userLocation.readable_address,
        timestamp: serverTimestamp(),
      });

      const emailResult = await emailjs.send(
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

      if (emailResult.status === 200 && emailResult.text === "OK") {
        showMessage("Resume sent successfully!", "success");
        setName("");
        setEmail("");
      } else {
        showMessage("EmailJS Error! Try Again", "error");
      }
    } catch (err) {
      showMessage("EmailJS Error! Try Again", "error");
    }

    setLoading(false);
  };

  return (
    <div className="resume-section">
      <h1 className="resume-title">Download My Resume</h1>
      <p className="resume-sub">Enter your details to receive my resume.</p>

      <form className="resume-form" onSubmit={onSubmitClick}>
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

      {message && (
        <p className={`resume-msg ${statusType}`}>{message}</p>
      )}

      {showConfirm && (
        <div className="confirm-overlay">
          <div className="confirm-box">
            <h3>Confirm Email</h3>
            <p>You will receive your resume at:</p>
            <p className="confirm-email">{email}</p>

            <div className="confirm-actions">
              <button className="confirm-send" onClick={handleSendResume}>
                Yes, Send
              </button>
              <button
                className="confirm-cancel"
                onClick={() => setShowConfirm(false)}
              >
                Edit Email
              </button>
            </div>
          </div>
        </div>
      )}

      <p className="skip-text">Prefer direct contact?</p>
      <button className="skip-btn" onClick={() => setActive("contact")}>
        Contact Me Instead
      </button>
    </div>
  );
}

export default Resume;

