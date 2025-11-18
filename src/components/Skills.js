import React, { useState } from "react";
import "./Skills.css";

// Import logos
import pythonLogo from "../assets/logos/python.png";
import azureLogo from "../assets/logos/azure.png";
import dataengLogo from "../assets/logos/dataeng.png";
import sqlLogo from "../assets/logos/sql.png";
import databricksLogo from "../assets/logos/databricks.png";

// Import certificates
import pythonCert from "../assets/python-cert.png";
import azureCert from "../assets/azure-cert.png";
import dataengCert from "../assets/dataeng-cert.png";
import sqlCert from "../assets/sql-cert.png";
import databricksCert from "../assets/databricks-cert.png";

function Skills() {
  const [showDescription, setShowDescription] = useState(false);

  const skills = [
    {
      name: "Python",
      logo: pythonLogo,
      cert: pythonCert,
      description: "ETL, automation, pandas, APIs."
    },
    {
      name: "Azure",
      logo: azureLogo,
      cert: azureCert,
      description: "ADF, Synapse, SHIR, Storage."
    },
    {
      name: "Data Engineering",
      logo: dataengLogo,
      cert: dataengCert,
      description: "Pipelines, modeling, ETL, Delta."
    },
    {
      name: "SQL",
      logo: sqlLogo,
      cert: sqlCert,
      description: "Joins, CTE, windows, tuning."
    },
    {
      name: "Databricks",
      logo: databricksLogo,
      cert: databricksCert,
      description: "PySpark, Delta, notebooks."
    }
  ];

  return (
    <div className="skills-section">
      <div className="skills-header">
        <h1>Skills</h1>

        <button
          className="eye-toggle"
          onClick={() => setShowDescription(!showDescription)}
        >
          {showDescription ? "Hide" : "Show"}
        </button>
      </div>

      <div className="skills-grid">
        {skills.map((skill, index) => (
          <div className="flip-card" key={index}>
            <div className="flip-card-inner">

              {/* FRONT SIDE */}
              <div className="flip-card-front">
                <img src={skill.logo} alt="logo" className="skill-logo" />
                <h2>{skill.name}</h2>
                {showDescription && <p className="skill-desc">{skill.description}</p>}
              </div>

              {/* BACK SIDE */}
              <div className="flip-card-back">
                <img src={skill.cert} alt="certificate" />
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Skills;

