import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, editProfile } from "../../../actions/profile";

export default function ProfileSettings() {
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const initialFormData = Object.freeze({
    name: "",
    job_title: "",
    phone: "",
    image: null,
  });
  const [formData, setFormData] = useState(initialFormData);
  const [image, setImage] = useState(null);
  const [nameError, setNameError] = useState("");
  const [jobTitleError, setJobTitleError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [imageError, setImageError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    dispatch(getProfile());
    setFormData({
      name: profile.payload.name,
      job_title: profile.payload.job_title,
      phone: profile.payload.phone,
      image: profile.payload.image,
    });
    setImage(profile.payload.image);
  }, [
    dispatch,
    profile.payload.image,
    profile.payload.job_title,
    profile.payload.name,
    profile.payload.phone,
  ]);

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
      fd.append("name", formData.name);
      fd.append("job_title", formData.job_title);
      fd.append("phone", formData.phone);
      formData.image && formData.image !== profile.payload.image
        ? fd.append("image", formData.image, formData.image.name)
        : fd.append("image", null);
      const { data } = await dispatch(editProfile(fd));
      if (data.success) {
        setNameError("");
        setJobTitleError("");
        setPhoneError("");
        setImageError("");
        setSuccessMessage(data.success);
      } else if (data.name_error) {
        setNameError(data.name_error);
        setJobTitleError("");
        setPhoneError("");
        setImageError("");
        setSuccessMessage("");
      } else if (data.job_title_error) {
        setNameError("");
        setJobTitleError(data.job_title_error);
        setPhoneError("");
        setImageError("");
        setSuccessMessage("");
      } else if (data.phone_error) {
        setNameError("");
        setJobTitleError("");
        setPhoneError(data.phone_error);
        setImageError("");
        setSuccessMessage("");
      } else if (data.image_error) {
        setNameError("");
        setJobTitleError("");
        setPhoneError("");
        setImageError(data.image_error);
        setSuccessMessage("");
      }
    } catch (err) {
      console.log("error in component");
      console.log(err);
    }
  };

  return (
    <div>
      <form>
        <section>
          <img src={image} alt={formData.name} width="200px" height="200px" />
          <input
            style={{ display: "none" }}
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={onChange}
          />
          <button onClick={upload.bind()}>Pick Image</button>
          <p>{imageError}</p>
        </section>
        <section>
          <div>
            <label htmlFor="name">Name : </label>
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
            <label htmlFor="job_title">Job Title : </label>
            <input
              type="text"
              id="job_title"
              name="job_title"
              value={formData.job_title}
              onChange={onChange}
            />
            <p>{jobTitleError}</p>
          </div>
          <div>
            <label htmlFor="phone">Phone Number : </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={onChange}
            />
            <p>{phoneError}</p>
          </div>
          <div>
            <button type="submit" onClick={onSubmit}>
              Save
            </button>
          </div>
          <p>{successMessage}</p>
        </section>
      </form>
    </div>
  );
}
