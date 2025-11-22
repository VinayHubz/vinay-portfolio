import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import "./FeedbackModal.css";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

const FeedbackModal = ({ open, onClose }) => {

  // HOOKS MUST BE AT TOP ALWAYS
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  // SAFE: CONDITIONAL RENDER AFTER HOOKS
  if (!open) return null;

  const submitFeedback = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // SAVE TO FIRESTORE
      await addDoc(collection(db, "feedback"), {
        userEmail,
        userName,
        rating,
        text,
        timestamp: new Date().toISOString(),
      });

      // SEND FEEDBACK EMAIL
      await emailjs.send(
        "service_1h738n5",
        "template_ogwkssg",
        {
          user_email: userEmail,
          user_name: userName,
          user_rating: rating,
          feedback_text: text,
          email: userEmail,  // MATCHES YOUR TEMPLATE
        },
        "LACorTHlpdAlSm0dS"
      );

      alert("Thank you! Your feedback has been sent.");
      setUserName("");
      setUserEmail("");
      setRating(0);
      setText("");
      onClose();

    } catch (err) {
      console.error("FEEDBACK ERROR:", err);
      alert("Something went wrong while sending feedback. Please try again later.");
    }

    setLoading(false);
  };

  return (
    <div className="fb-overlay">
      <div className="fb-modal">

        <button className="close" onClick={onClose}>×</button>
        <h3>Your Feedback</h3>

        <form onSubmit={submitFeedback}>

          <input
            type="text"
            placeholder="Your Name"
            className="fb-input"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Your Email"
            className="fb-input"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />

          <div className="stars">
            {[1,2,3,4,5].map((s) => (
              <span
                key={s}
                className={rating >= s ? "star active" : "star"}
                onClick={() => setRating(s)}
              >★</span>
            ))}
          </div>

          <textarea
            placeholder="Write your message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          ></textarea>

          <button className="submit" type="submit" disabled={loading}>
            {loading ? "Sending..." : "Submit Feedback"}
          </button>

        </form>

      </div>
    </div>
  );
};

export default FeedbackModal;

