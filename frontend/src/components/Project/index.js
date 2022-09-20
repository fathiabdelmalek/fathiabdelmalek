import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getImages } from "../../actions/images";
import { getProject, doneLoading } from "../../actions/project";

export default function Project() {
  const { id } = useParams();
  const project = useSelector((state) => state.project);
  const images = useSelector((state) => state.images);
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);

  useEffect(() => {
    dispatch(getProject(id));
    dispatch(getImages(id)).then((res) => {
      setImage(res.payload[0].image);
    });
    return () => {
      dispatch(doneLoading());
    };
  }, [dispatch, id]);

  const previous = () => {
    let img = image;
    for (let i = images.payload.length - 1; i >= 0; i--) {
      if (images.payload[i].image == img) {
        if (i === 0) {
          setImage(images.payload[images.payload.length - 1].image);
          break;
        }
        setImage(images.payload[i - 1].image);
        break;
      }
    }
  };

  const next = () => {
    let img = image;
    for (let i = 0; i < images.payload.length; i++) {
      if (images.payload[i].image == img) {
        if (i === images.payload.length - 1) {
          setImage(images.payload[0].image);
          break;
        }
        setImage(images.payload[i + 1].image);
        break;
      }
    }
  };

  return (
    <div className="project-container">
      {project.loading ? (
        <p>Loading</p>
      ) : (
        <React.Fragment>
          <section className="project-image">
            <button onClick={previous}>Previous</button>
            <img id="image" src={image} />
            <button onClick={next}>Next</button>
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
