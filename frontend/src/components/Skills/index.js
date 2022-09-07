import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSkills } from "../../actions/skills";
import Skill from "./Skill";

export default function Skills() {
  const skills = useSelector((state) => state.skills);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSkills());
  }, [dispatch]);

  return (
    <div>
      {skills.loading ? (
        "Loading"
      ) : (
        <ul className="skill-container">
          {skills.payload.map((skill) => (
            <li key={skill.id} className="skill">
              <Skill skill={skill} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
