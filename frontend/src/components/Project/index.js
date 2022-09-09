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
  }, [dispatch, id]);

  return (
    <div className="project-container">
      {project.loading ? (
        <p>Loading</p>
      ) : (
        <React.Fragment>
          <section className="project-image">
            <a href={project.payload.image} target="_blank" rel="noreferrer">
              <img src={project.payload.image} />
            </a>
          </section>
          <section className="project-info">
            <h1 className="project-name">
              <a href="#" target="_blank">
                {project.payload.name}
              </a>
            </h1>
            <p className="project-description">{project.payload.description}</p>
          </section>
        </React.Fragment>
      )}
    </div>
  );
}
