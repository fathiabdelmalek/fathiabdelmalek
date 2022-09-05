import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "../../../actions/projects";
import Project from "./Project";

export default function ProjectsSettings() {
  const projects = useSelector((state) => state.projects);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  return (
    <div>
      {projects.loading ? (
        "Loading"
      ) : (
        <ul>
          {projects.payload.map((project) => (
            <li key={project.id}>
              <Project project={project} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
