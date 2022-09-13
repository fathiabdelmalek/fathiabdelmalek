import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProject } from "../../../actions/projects";

export default function NewProject() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialForm = Object.freeze({
    name: "",
    link: "",
    description: "",
  });
  const [formData, setFormData] = useState(initialForm);
  const [nameError, setNameError] = useState("");
  const [images, setImages] = useState([]);
  let _images = [];
  let html = document.getElementById("images-container");

  const upload = (e) => {
    e.preventDefault();
    document.getElementById("images").click();
  };

  const displayImages = () => {
    for (let i = 0; i < _images.length; i++) {
      html.innerHTML =
        html.innerHTML +
        `<img src=${_images[i]} width="200px" height="200px" />`;
    }
    return html;
  };

  const onChange = (e) => {
    if (e.target.name === "images") {
      let files = e.target.files;
      setFormData({
        ...formData,
        [e.target.name]: files,
      });
      for (let i = 0; i < files.length; i++) {
        setImages((images) => [...images, URL.createObjectURL(files[i])]);
        _images.push(URL.createObjectURL(files[i]));
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
      fd.append("link", formData.link);
      fd.append("description", formData.description);
      images ? fd.append("images", images) : fd.append("images", null);
      const res = await dispatch(createProject(fd));
      if (res.data.success) {
        setNameError("");
        navigate(`/settings/projects/${res.data.id}`);
      } else if (res.data.name_error) setNameError(res.data.name_error);
      else if (res.data.data_error) setNameError(res.data.data_error);
    } catch (err) {
      console.log("error in component");
      console.log(err);
    }
  };

  return (
    <div>
      <form>
        <div>
          <label htmlFor="name">Project Name : </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="You should enter project name"
            onChange={onChange}
          />
          <p>{nameError}</p>
        </div>
        <div>
          <label htmlFor="link">Project link : </label>
          <input
            type="text"
            id="link"
            name="link"
            placeholder="Enter the project link if exist"
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="description">Project description : </label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter a description for this project"
            onChange={onChange}
          />
        </div>
        <div>
          <button type="submit" onClick={onSubmit}>
            Create
          </button>
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
  );
}
