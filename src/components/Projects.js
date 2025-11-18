import React, { useState } from "react";
import "./Projects.css";

// Import folder image
import FolderIcon from "../assets/projects.png";

function Projects() {
  const [showDescription, setShowDescription] = useState(false);

  const projects = [
    {
      title: "Azure Data Pipeline",
      description: "Designed an end-to-end data ingestion pipeline using ADF, Storage, and Synapse.",
    },
    {
      title: "SQL Data Analysis",
      description: "Performed advanced SQL analytics using joins, window functions, and CTEs.",
    },
    {
      title: "Databricks ETL Workflow",
      description: "Created a PySpark ETL pipeline using Delta Lake and notebook workflows.",
    }
  ];

  return (
    <div className="projects-section">
      <div className="projects-header">
        <h1>Projects</h1>

        {/* Eye Toggle */}
        <button
          className="project-toggle"
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
    </div>
  );
}

export default Projects;

