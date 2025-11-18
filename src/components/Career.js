// src/components/Career.js
import React, { useEffect, useRef, useState } from "react";
import "./Career.css";

import gradImg from "../assets/career/grad.png";
import sqlImg from "../assets/career/sql.png";
import pythonImg from "../assets/career/python.png";
import dataengImg from "../assets/career/dataeng.png";
import seniorImg from "../assets/career/senior.png";
import sprite from "../assets/career/explorer-walk.png";
import bg from "../assets/career/treasure-bg.png";

export default function Career() {
  const explorerRef = useRef(null);
  const containerRef = useRef(null);

  // milestone refs to apply glow class
  const milestoneRefs = {
    grad: useRef(null),
    sql: useRef(null),
    python: useRef(null),
    dataeng: useRef(null),
    senior: useRef(null),
  };

  // timing config (seconds)
  const totalDuration = 12; // total walk duration in seconds
  // milestone times (in seconds) when explorer should reach each milestone
  // Adjust these to fine-tune when the explorer hits each point on the path
  const milestoneTimes = [
    { key: "grad", t: 0.5 },     // start (small pause)
    { key: "sql", t: 3.0 },
    { key: "python", t: 5.5 },
    { key: "dataeng", t: 8.2 },
    { key: "senior", t: 11.0 },
  ];

  // local state to restart animation (toggle class)
  const [runKey, setRunKey] = useState(0);

  useEffect(() => {
    if (!explorerRef.current) return;

    // remove any previous glow
    Object.values(milestoneRefs).forEach(r => {
      if (r.current) r.current.classList.remove("glow");
    });

    // add the walking class (sprite + motion)
    const el = explorerRef.current;
    // restart animation by toggling a class
    el.classList.remove("walk-active");
    // force reflow to restart animation
    void el.offsetWidth;
    el.classList.add("walk-active");

    // schedule milestone glow toggles via timeouts
    const timeouts = milestoneTimes.map(m => {
      const ms = m.t * 1000;
      return setTimeout(() => {
        const ref = milestoneRefs[m.key].current;
        if (ref) {
          ref.classList.add("glow");
          // remove glow after a small period (so it blinks)
          setTimeout(() => ref.classList.remove("glow"), 1800);
        }
      }, ms);
    });

    // final sparkle at end: strong treasure glow
    const finalTimeout = setTimeout(() => {
      const ref = milestoneRefs["senior"].current;
      if (ref) ref.classList.add("glow-strong");
      setTimeout(() => ref && ref.classList.remove("glow-strong"), 2600);
    }, totalDuration * 1000 + 100);

    return () => {
      timeouts.forEach(t => clearTimeout(t));
      clearTimeout(finalTimeout);
    };
  }, [runKey]); // restart when runKey toggles

  const restart = () => setRunKey(k => k + 1);

  return (
    <section
      className="career-root"
      style={{ backgroundImage: `url(${bg})` }}
      ref={containerRef}
    >
      <div className="career-header">
        <h1>Career Treasure Map</h1>
        <div className="controls">
          <button onClick={restart} aria-label="Start walk">Start Walk</button>
        </div>
      </div>

      <div className="map-area">
        {/* SVG path used both visually and as offset-path */}
        <svg className="map-svg" viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid meet">
          <defs>
            <path id="treasurePath" d="M 110 420 C 260 300, 300 200, 460 160 S 640 220, 740 180 S 860 240, 920 150" />
          </defs>

          {/* visible dotted path */}
          <use href="#treasurePath" stroke="#b5802a" strokeWidth="8" fill="none" strokeDasharray="18 14" strokeLinecap="round" opacity="0.95"/>

          {/* small dotted guide above path for sparkle */}
          <use href="#treasurePath" stroke="#ffd86b" strokeWidth="2" fill="none" strokeDasharray="2 12" opacity="0.45"/>
        </svg>

        {/* Milestones — positioned roughly along path */}
        <div className="milestone milestone-grad" ref={milestoneRefs.grad}>
          <img src={gradImg} alt="Graduation" />
          <div className="milestone-label">Graduation</div>
        </div>

        <div className="milestone milestone-sql" ref={milestoneRefs.sql}>
          <img src={sqlImg} alt="SQL Developer" />
          <div className="milestone-label">SQL Developer</div>
        </div>

        <div className="milestone milestone-python" ref={milestoneRefs.python}>
          <img src={pythonImg} alt="Python Developer" />
          <div className="milestone-label">Python Developer</div>
        </div>

        <div className="milestone milestone-dataeng" ref={milestoneRefs.dataeng}>
          <img src={dataengImg} alt="Data Engineer" />
          <div className="milestone-label">Data Engineer</div>
        </div>

        <div className="milestone milestone-senior" ref={milestoneRefs.senior}>
          <img src={seniorImg} alt="Senior Data Engineer" />
          <div className="milestone-label">Senior Data Engineer</div>
        </div>

        {/* The explorer sprite — animated via CSS:
            - sprite walk cycle (steps)
            - motion path uses same SVG path (offset-path)
        */}
        <div
          className="explorer"
          ref={explorerRef}
          role="img"
          aria-label="Explorer walking"
          title="Explorer walking"
        >
          {/* inner visual anchored box where sprite sheet is rendered */}
          <div className="explorer-sprite" style={{ backgroundImage: `url(${sprite})` }} />
        </div>
      </div>

      <div className="legend-note">Tip: click "Start Walk" or press Enter to run the animation. Each milestone glows when reached.</div>
    </section>
  );
}

