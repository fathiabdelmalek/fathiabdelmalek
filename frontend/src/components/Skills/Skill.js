import React, { useEffect } from "react";

export default function List({ skill }) {
  const value = skill.value * 3.6 + "deg";

  useEffect(() => {
    document
      .getElementById(`${skill.id}`)
      .style.setProperty(`--value`, `${value}`);
  }, [skill.id, value]);

  return (
    <div className="skill">
      <div id={skill.id} className="progress">
        <span className="skill-value">{skill.value}%</span>
      </div>
      <span className="skill-name">{skill.name}</span>
    </div>
  );
}
