import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getImages } from "../../actions/images";

export default function Project({ project }) {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);

  useEffect(() => {
    dispatch(getImages(project.id)).then((res) => {
      setImage(res.payload[0].image);
    });
  }, [dispatch, project.id]);

  return (
    <NavLink to={`/projects/${project.id}`}>
      <section className="image-section">
        <img className="project-image" id="image" src={image} />
      </section>
      <section className="info-section">
        <h3 className="project-name">{project.name}</h3>
      </section>
    </NavLink>
  );
}
