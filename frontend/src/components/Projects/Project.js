import React from "react";
import { NavLink } from "react-router-dom";

export default function Project({ project }) {
  return (
    <div>
      <NavLink to={`/projects/${project.id}`}>
        <h3>{project.name}</h3>
      </NavLink>
      <span>{project.likes}</span>
      <p>{project.description}</p>
    </div>
  );
}
