import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData, editProfile } from "../../../actions/profile";

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
      let fd = new FormData();
      fd.append("name", formData.name);
      fd.append("job_title", formData.job_title);
      fd.append("phone", formData.phone);
      formData.image
        ? fd.append("image", formData.image, formData.image.name)
        : fd.append("image", profile.payload.image, profile.payload.image.name);
      const res = await dispatch(editProfile(fd));
      if (res.success) {
        setNameError("");
        setJobTitleError("");
        setPhoneError("");
        setImageError("");
        setSuccessMessage(res.success);
      } else if (res.name_error) {
        setNameError(res.name_error);
        setJobTitleError("");
        setPhoneError("");
        setImageError("");
      } else if (res.job_title_error) {
        setNameError("");
        setJobTitleError(res.job_title_error);
        setPhoneError("");
        setImageError("");
      } else if (res.phone_error) {
        setNameError("");
        setJobTitleError("");
        setPhoneError(res.phone_error);
        setImageError("");
      } else if (res.image_error) {
        setNameError("");
        setJobTitleError("");
        setPhoneError("");
        setImageError(res.image_error);
      } else console.log(res);
      // if (res.status === 200) {
      //   console.log("success");
      //   console.log(res);
      // } else console.log("fail");
    } catch (err) {
      console.log("error");
      console.log(err);
    }
  };

  useEffect(() => {
    dispatch(getData());
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

  return (
    <div>
      <form>
        <section>
          <img src={image} alt={formData.name} width="200px" height="200px" />
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            value={profile.payload.image.name}
            onChange={onChange}
          />
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
              onChange={() => onChange()}
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
