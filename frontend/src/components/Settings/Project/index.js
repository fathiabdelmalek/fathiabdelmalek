import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getImages } from "../../../actions/images";
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
    link: "",
    description: "",
    images: [],
  });
  const [formData, setFormData] = useState(initialFormData);
  const [nameError, setNameError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  let images = [];
  let html = document.getElementById("images-container");

  useEffect(() => {
    dispatch(getProject(id)).then((res) => {
      setFormData({
        name: res.data.name,
        description: res.data.description,
      });
    });
    dispatch(getImages(id)).then((res) => {
      let arr = Array.from(res.payload);
      arr.forEach((image) => {
        images.push(image.image);
      });
    });
    console.log(images);
    return () => {
      dispatch(doneLoading());
    };
  }, [dispatch, id]);

  const upload = (e) => {
    e.preventDefault();
    document.getElementById("images").click();
  };

  const displayImages = () => {
    html.innerHTML = "";
    for (let i = 0; i < images.length; i++)
      html.innerHTML =
        html.innerHTML +
        `<img src=${images[i]} width="200px" height="200px" />`;
    return html;
  };

  const onChange = (e) => {
    if (e.target.name === "images") {
      let files = e.target.files;
      setFormData({
        ...formData,
        [e.target.name]: files,
      });
      images = [];
      for (let i = 0; i < files.length; i++) {
        images.push(URL.createObjectURL(files[i]));
      }
      displayImages();
    } else setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      formData.name && formData.name !== ""
        ? fd.append("name", formData.name)
        : fd.append("name", null);
      fd.append("description", formData.description);
      const { data } = await dispatch(editProject(id, fd));
      if (data.success) {
        setNameError("");
        setSuccessMessage(data.success);
      } else {
        setNameError(data.name_error);
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

  return (
    <div>
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
            <div>
              <button onClick={upload.bind()}>Pick Image</button>
              <input
                style={{ display: "none" }}
                type="file"
                id="images"
                name="images"
                accept="image/*"
                onChange={onChange}
                multiple
              />
              <div id="images-container"></div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
