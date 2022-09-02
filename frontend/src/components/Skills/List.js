import React from "react";

export default function List({ skills }) {
  return (
    <ul>
      {skills.map((skill) => {
        return (
          <li key={skill.id}>
            <p>{skill.name}</p>
            <p>{skill.value}</p>
          </li>
        );
      })}
    </ul>
  );
}
