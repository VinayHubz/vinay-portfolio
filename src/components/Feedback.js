import React, { useState } from "react";
import "./FeedbackModal.css";

const FeedbackModal = ({ onClose }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [text, setText] = useState("");

  const submit = (e) => {
    e.preventDefault();
    // save to localStorage (simulate sheet) - later connect to real backend
    const history = JSON.parse(localStorage.getItem("feedback") || "[]");
    history.push({ rating, text, ts: new Date().toISOString() });
    localStorage.setItem("feedback", JSON.stringify(history));
    alert("Thanks for your feedback!");
    onClose();
  };

  return (
    <div className="fb-overlay">
      <div className="fb-modal">
        <button className="close" onClick={onClose}>×</button>
        <h3>Feedback</h3>

        <div className="stars">
          {[1,2,3,4,5].map((s) => (
            <span
              key={s}
              className={ (hover || rating) >= s ? "star active" : "star" }
              onClick={() => setRating(s)}
              onMouseEnter={() => setHover(s)}
              onMouseLeave={() => setHover(0)}
            >★</span>
          ))}
        </div>

        <form onSubmit={submit}>
          <textarea placeholder="Please describe improvement areas..." value={text} onChange={(e)=>setText(e.target.value)} required></textarea>
          <button className="submit" type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackModal;

