import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../../actions/skills";
import Form from "./Form";
import Skill from "./Skill";

export default function SkillsSettings() {
  const skills = useSelector((state) => state.skills);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  return (
    <div>
      <Form />
      {skills.loading ? (
        "Loading"
      ) : (
        <ul>
          {skills.payload.map((skill) => (
            <li key={skill.id}>
              <Skill skill={skill} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
