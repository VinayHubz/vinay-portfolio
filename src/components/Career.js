// src/components/Career.js
import React from "react";
import { motion } from "framer-motion";
import "./Career.css";

import gradImg from "../assets/career/grad.png";
import sqlImg from "../assets/career/sql.png";
import pythonImg from "../assets/career/python.png";
import dataengImg from "../assets/career/dataeng.png";
import seniorImg from "../assets/career/senior.png";

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.10, ease: "easeOut" }
  })
};

export default function Career() {
  const milestones = [
    {
      key: "grad",
      title: "BSc Computer Science",
      year: "2017 — 2020",
      desc: "Graduated with strong fundamentals in CS, algorithms and programming.",
      img: gradImg
    },
    {
      key: "sql",
      title: "SQL Developer",
      year: "2020 — 2021",
      desc: "Worked on ETL queries, optimizations and database schema design.",
      img: sqlImg
    },
    {
      key: "python",
      title: "Python Developer",
      year: "2021 — 2022",
      desc: "Automated pipelines and data workflows using Python and Pandas.",
      img: pythonImg
    },
    {
      key: "dataeng",
      title: "Data Engineer",
      year: "2022 — 2024",
      desc: "Built cloud pipelines, Delta Lake workflows and scalable ETL processes.",
      img: dataengImg
    },
    {
      key: "senior",
      title: "Senior Data Engineer (Goal)",
      year: "Future",
      desc: "Aiming to architect scalable systems, mentor engineers and lead data solutions.",
      img: seniorImg
    }
  ];

  return (
    <section className="career-section">
      <div className="career-inner">
        <header className="career-header">
          <h1>Career Timeline</h1>
          <p className="career-sub">A premium scroll experience of my journey — and my goal ahead.</p>
        </header>

        <div className="timeline-wrapper">
          <div className="timeline-line" />

          <div className="timeline-list">
            {milestones.map((m, idx) => (
              <motion.article
                className="timeline-item"
                key={m.key}
                custom={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.30 }}
                variants={itemVariants}
              >
                <div className="item-bullet">
                  <div className="bullet-ring" />
                </div>

                <div className="item-card">
                  <div className="item-media hover-gold">
                    <img src={m.img} alt={m.title} />
                  </div>

                  <div className="item-content">
                    <div className="item-meta">
                      <h3 className="item-title">{m.title}</h3>
                      <span className="item-year">{m.year}</span>
                    </div>

                    <p className="item-desc">{m.desc}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

