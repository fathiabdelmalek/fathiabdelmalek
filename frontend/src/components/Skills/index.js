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
    <div className="skill-container">
      {skills.loading ? (
        "Loading"
      ) : (
        <div>
          {/* <ul> */}
          {skills.payload.map((skill) => (
            <div key={skill.id}>
              <Skill skill={skill} />
            </div>
          ))}
          {/* </ul> */}
        </div>
      )}
    </div>
  );
}
