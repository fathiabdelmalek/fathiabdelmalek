import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createImage } from "../../../actions/images";
import { createProject } from "../../../actions/projects";

export default function NewProject() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialForm = Object.freeze({
    name: "",
    link: "",
    description: "",
    images: [],
  });
  const [formData, setFormData] = useState(initialForm);
  const [nameError, setNameError] = useState("");
  let images = [];
  let html = document.getElementById("images-container");

  const upload = (e) => {
    e.preventDefault();
    document.getElementById("images").click();
  };

  const displayImages = () => {
    html.innerHTML = "";
    for (let i = 0; i < images.length; i++) {
      html.innerHTML =
        html.innerHTML +
        `<img src=${images[i]} width="200px" height="200px" />`;
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
      fd.append("link", formData.link);
      fd.append("description", formData.description);
      const { data } = await dispatch(createProject(fd));
      if (data.success) {
        setNameError("");
        let arr = Array.from(formData.images);
        arr.forEach((image) => {
          let fd = new FormData();
          fd.append("project", data.id);
          fd.append("image", image, image.name);
          dispatch(createImage(fd));
        });
        navigate(`/settings/projects/${data.id}`);
      } else if (data.name_error) setNameError(data.name_error);
      else if (data.data_error) setNameError(data.data_error);
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
