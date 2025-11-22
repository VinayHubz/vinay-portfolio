import React, { useState } from "react";
import "./Skills.css";

/* IMAGES */
import pythonLogo from "../assets/logos/python.png";
import azureLogo from "../assets/logos/azure.png";
import dataengLogo from "../assets/logos/dataeng.png";
import sqlLogo from "../assets/logos/sql.png";
import databricksLogo from "../assets/logos/databricks.png";

/* CERTIFICATES */
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
      description: "ETL, Automation, Pandas, API scripting."
    },
    {
      name: "Azure",
      logo: azureLogo,
      cert: azureCert,
      description: "ADF, Synapse, SHIR, Storage, Logic Apps."
    },
    {
      name: "Data Engineering",
      logo: dataengLogo,
      cert: dataengCert,
      description: "Pipelines, Modeling, ETL/ELT, Delta Lakes."
    },
    {
      name: "SQL",
      logo: sqlLogo,
      cert: sqlCert,
      description: "Joins, CTEs, Window functions, tuning."
    },
    {
      name: "Databricks",
      logo: databricksLogo,
      cert: databricksCert,
      description: "PySpark, Delta, Workspace development."
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

              {/* ---------- FRONT ---------- */}
              <div className="flip-card-front">
                <img src={skill.logo} alt={skill.name} />

                <div className="overlay-text">
                  <div className="overlay-title">{skill.name}</div>

                  {showDescription && (
                    <div className="overlay-desc">{skill.description}</div>
                  )}
                </div>
              </div>

              {/* ---------- BACK (CERTIFICATE) ---------- */}
              <div className="flip-card-back">
                <img src={skill.cert} alt={skill.name + " certificate"} />
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Skills;

