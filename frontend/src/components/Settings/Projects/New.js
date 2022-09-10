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
    images: null,
  });
  const [formData, setFormData] = useState(initialForm);
  const [images, setImages] = useState([]);
  const [nameError, setNameError] = useState("");
  let _images = [];

  const upload = (e) => {
    e.preventDefault();
    document.getElementById("images").click();
  };

  const displayImages = () => {
    // images.forEach((image) => {
    //   return <img src={image} width="200px" height="200px" />;
    // });
    for (let image in _images) {
      console.log(_images);
      return <img src={image} width="200px" height="200px" />;
    }
    // for (let i = 0; i < images.length; i++) {
    //   console.log(images[i]);
    //   return <img src={images[i]} width="200px" height="200px" />;
    // }
  };

  const onChange = (e) => {
    if (e.target.name === "images") {
      let files = e.target.files;
      setFormData({
        ...formData,
        [e.target.name]: files,
      });
      for (let i = 0; i < files.length; i++) {
        // setImages(...images, URL.createObjectURL(files[i]));
        _images.push(URL.createObjectURL(files[i]));
      }
      displayImages();
      setImages(_images);
      console.log(images);
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
      formData.images
        ? fd.append("images", formData.images, formData.images.name)
        : fd.append("images", null);
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
          {/* <img src={image} width="200px" height="200px" /> */}
          {displayImages()}
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
