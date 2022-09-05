import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProject, doneLoading } from "../../../actions/project";
import { createProject } from "../../../actions/projects";

export default function ProjectSettings() {
  const { id } = useParams();
  const project = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const initialFormData = Object.freeze({
    name: "",
    description: "",
    image: null,
  });
  const [formData, setFormData] = useState(initialFormData);
  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {};

  useEffect(() => {
    dispatch(getProject(id)).then((res) => {
      setFormData({
        name: res.data.name,
        description: res.data.description,
        image: res.data.image,
      });
    });
    return () => {
      dispatch(doneLoading());
    };
  }, [dispatch, id, project.description, project.image, project.name]);

  return (
    <div className="skills-container">
      {project.loading ? (
        <p>Loading</p>
      ) : (
        <div>
          <form>
            <div>
              <label htmlFor="name">Project Name : </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={onChange}
              />
              <p>{nameError}</p>
            </div>
            <div>
              <label htmlFor="description">Project Description : </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                placeholder="Enter a description for this project"
              ></textarea>
              <p>{descriptionError}</p>
            </div>
            <div>
              <button type="submit" onClick={onSubmit}>
                Create
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
