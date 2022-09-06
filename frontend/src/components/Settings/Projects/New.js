import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProject } from "../../../actions/projects";

export default function NewProject() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialForm = Object.freeze({
    name: "",
    description: "",
    image: null,
  });
  const [formData, setFormData] = useState(initialForm);
  const [image, setImage] = useState(null);
  const [nameError, setNameError] = useState("");

  const upload = (e) => {
    e.preventDefault();
    document.getElementById("image").click();
  };

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
      formData.name && formData.name !== ""
        ? fd.append("name", formData.name)
        : fd.append("name", null);
      fd.append("description", formData.description);
      formData.image
        ? fd.append("image", formData.image, formData.image.name)
        : fd.append("image", null);
      const res = await dispatch(createProject(fd));
      if (res.data.success) {
        console.log(res.data);
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
          <img src={image} width="200px" height="200px" />
          <input
            style={{ display: "none" }}
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={onChange}
          />
          <button onClick={upload.bind()}>Pick Image</button>
        </div>
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
      </form>
    </div>
  );
}
