import React from "react";
import { NavLink } from "react-router-dom";

export default function Project({ project }) {
  return (
    <NavLink to={`/projects/${project.id}`}>
      <section className="image-section">
        <img className="project-image" src={project.image} />
      </section>
      <section className="info-section">
        <h3 className="project-name">{project.name}</h3>
      </section>
    </NavLink>
  );
}
