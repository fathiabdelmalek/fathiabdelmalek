import React from "react";
import { NavLink } from "react-router-dom";

export default function Project({ project }) {
  return (
    <React.Fragment>
      <section className="image-section">
        <img className="project-image" src={project.image} />
      </section>
      <section className="info-section">
        <NavLink to={`/projects/${project.id}`}>
          <h3 className="project-name">{project.name}</h3>
        </NavLink>
        <span className="project-likes">{project.likes}</span>
      </section>
    </React.Fragment>
  );
}
