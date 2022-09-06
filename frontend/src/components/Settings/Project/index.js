import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getProject,
  doneLoading,
  editProject,
  deleteProject,
} from "../../../actions/project";

export default function ProjectSettings() {
  const { id } = useParams();
  const project = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialFormData = Object.freeze({
    name: "",
    description: "",
    image: null,
  });
  const [formData, setFormData] = useState(initialFormData);
  const [image, setImage] = useState(null);
  const [nameError, setNameError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const onChange = (e) => {
    if (e.target.name === "image") {
      setFormData({
        ...formData,
        [e.target.name]: e.target.files[0],
      });
      setImage(URL.createObjectURL(e.target.files[0]));
    } else setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      fd.append("name", formData.name);
      formData.name && formData.name !== ""
        ? fd.append("name", formData.name)
        : fd.append("name", null);
      fd.append("description", formData.description);
      formData.image && formData.image !== project.payload.image
        ? fd.append("image", formData.image, formData.image.name)
        : fd.append("image", null);
      const res = await dispatch(editProject(id, fd));
      if (res.success) {
        setNameError("");
        setSuccessMessage(res.success);
      } else {
        setNameError(res.name_error);
        setSuccessMessage("");
      }
    } catch (err) {
      console.log("error in component");
      console.log(err);
    }
  };

  const onDelete = async (e) => {
    try {
      dispatch(deleteProject(id));
      navigate("/settings/projects", { replace: true });
    } catch (err) {
      console.log(err);
    }
  };

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
  }, [dispatch, id]);

  return (
    <div className="skills-container">
      {project.loading ? (
        <p>Loading</p>
      ) : (
        <div>
          <form>
            <div>
              <img
                src={image}
                alt={project.payload.name}
                width="200px"
                height="200px"
              />
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={onChange}
              />
            </div>
            <div>
              <label htmlFor="name">Project Name : </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                placeholder="You should enter project name"
                onChange={onChange}
              />
              <p>{nameError}</p>
            </div>
            <div>
              <label htmlFor="description">Project description : </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                placeholder="Enter a description for this project"
                onChange={onChange}
              />
            </div>
            <div>
              <button type="submit" onClick={onSubmit}>
                Save
              </button>
              <button onClick={onDelete}>Delete</button>
              <p>{successMessage}</p>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
