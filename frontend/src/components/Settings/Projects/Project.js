import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { deleteProject } from "../../../actions/project";
import { getImages } from "../../../actions/images";

export default function Project({ project }) {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);

  useEffect(() => {
    dispatch(getImages(project.id)).then((res) => {
      setImage(res.payload[0].image);
    });
  }, [dispatch, project.id]);

  const onDelete = async (e) => {
    try {
      dispatch(deleteProject(project.id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <NavLink to={`/settings/projects/${project.id}`}>
        <section className="image-section">
          <img className="project-image" id="image" src={image} />
        </section>
        <section className="info-section">
          <h3 className="project-name">{project.name}</h3>
        </section>
      </NavLink>
      <button onClick={onDelete}>Delete</button>
    </React.Fragment>
  );
}
