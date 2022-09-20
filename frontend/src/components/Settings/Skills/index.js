import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getSkills } from "../../../actions/skills";
import Form from "./Form";
import Skill from "./Skill";

export default function SkillsSettings({ isAuthenticated }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const skills = useSelector((state) => state.skills);

  useEffect(() => {
    if (!isAuthenticated) navigate(-1, { replace: true });
    dispatch(getSkills());
  }, [dispatch, isAuthenticated, navigate]);

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
