import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export default function Project({ project }) {
  return (
    <NavLink to={`/projects/${project.id}`}>
      <section className="image-section">
        <img className="project-image" src={project.image} />
      </section>
      <section className="info-section">
        <h3 className="project-name">{project.name}</h3>
        <span className="project-likes">
          {project.likes + " "}
          <i style={{ color: "red" }}>
            <FontAwesomeIcon icon={faHeart} />
          </i>
        </span>
      </section>
    </NavLink>
  );
}
