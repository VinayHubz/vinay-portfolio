// src/components/Projects.js
import React, { useState } from "react";
import "./Projects.css";

// Import folder image
import FolderIcon from "../assets/projects.png";

function Projects() {
  const [showDescription, setShowDescription] = useState(false);

  const projects = [
    {
      title: "Azure Data Pipeline",
      description:
        "Designed a complete ADF → Storage → Synapse data ingestion and transformation workflow.",
    },
    {
      title: "SQL Data Analysis",
      description:
        "Analytics using joins, CTEs, window functions, tuning & performance optimization.",
    },
    {
      title: "Databricks ETL Workflow",
      description:
        "PySpark ETL pipeline with Delta Lake, Auto Loader, and workflow scheduling.",
    }
  ];

  return (
    <section className="projects-section">
      <div className="projects-header">
        <h1>Projects</h1>

        <button
          className="gradient-btn"
          onClick={() => setShowDescription(!showDescription)}
        >
          {showDescription ? "Hide" : "Show"}
        </button>
      </div>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <div className="project-card" key={index}>
            <img src={FolderIcon} alt="folder" className="folder-icon" />

            <h2 className="project-title">{project.title}</h2>

            {showDescription && (
              <p className="project-desc">{project.description}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;

