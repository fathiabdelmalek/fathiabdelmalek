import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { getProjects } from "../../../actions/projects";
import Project from "./Project";

export default function ProjectsSettings({ isAuthenticated }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const projects = useSelector((state) => state.projects);

  useEffect(() => {
    if (!isAuthenticated) navigate(-1, { replace: true });
    dispatch(getProjects());
  }, [dispatch, isAuthenticated, navigate]);

  return (
    <div>
      <NavLink to={`/settings/projects/new`}>Create new project</NavLink>
      {projects.loading ? (
        "Loading"
      ) : (
        <ul className="projects-container">
          {projects.payload.map((project) => (
            <li key={project.id} className="project">
              <Project project={project} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
