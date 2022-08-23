import React from "react";

export default function List(props) {
  return (
    <ul>
      {props.projects.map((project) => {
        return (
          <li key={project.id}>
            <h3>{project.name}</h3>
            <span>{project.likes}</span>
            <p>{project.description}</p>
          </li>
        );
      })}
    </ul>
  );
}
