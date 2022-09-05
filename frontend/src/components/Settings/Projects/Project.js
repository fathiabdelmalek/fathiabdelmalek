import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { deleteProject } from "../../../actions/project";

export default function Project({ project }) {
  const dispatch = useDispatch();

  const onDelete = async (e) => {
    try {
      dispatch(deleteProject(project.id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <NavLink to={`/settings/projects/${project.id}`}>
        <h3>{project.name}</h3>
      </NavLink>
      <span>{project.likes}</span>
      <p>{project.description}</p>
      <button onClick={onDelete}>delete</button>
    </div>
  );
}
