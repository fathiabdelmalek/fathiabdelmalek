import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProject, doneLoading } from "../../actions/project";

export default function Project() {
  const { id } = useParams();
  const project = useSelector((state) => state.project);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProject(id));
    return () => {
      dispatch(doneLoading());
    };
  }, []);

  return (
    <div className="skills-container">
      {project.loading ? (
        <p>Loading</p>
      ) : (
        <div>
          <p>{project.payload.name}</p>
          <p>{project.payload.description}</p>
        </div>
      )}
    </div>
  );
}
