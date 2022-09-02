import React from "react";
import {NavLink} from "react-router-dom";

export default function List({ projects }) {
  return (
    <ul>
      {projects.map((project) => {
        return (
          <li key={project.id}>
            <NavLink to={`/projects/${project.id}`} className="id"><h3>{project.name}</h3></NavLink>
            <span>{project.likes}</span>
            <p>{project.description}</p>
          </li>
        );
      })}
    </ul>
  );
}
