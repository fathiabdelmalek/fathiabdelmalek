import React from "react";

export default function List(props) {
  return (
    <ul>
      {props.skills.map((skill) => {
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
