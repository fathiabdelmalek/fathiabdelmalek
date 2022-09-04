import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData, editProfile } from "../../../actions/profile";

export default function ProfileSettings() {
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const initialFormData = Object.freeze({
    name: "",
    job_title: "",
    email: "",
    phone: "",
  });
  const [formData, setFormData] = useState(initialFormData);
  const [nameError, setNameError] = useState("");
  const [jobTitleError, setJobTitleError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await dispatch(
        editProfile(formData.name, formData.job_title, formData.phone)
      );
      if (res.success) {
        setNameError("");
        setJobTitleError("");
        setPhoneError("");
        setSuccessMessage(res.success);
      } else if (res.name_error) {
        setNameError(res.name_error);
        setJobTitleError("");
        setPhoneError("");
      } else if (res.job_title_error) {
        setNameError("");
        setJobTitleError(res.job_title_error);
        setPhoneError("");
      } else if (res.phone_error) {
        setNameError("");
        setJobTitleError("");
        setPhoneError(res.phone_error);
      } else {
        console.log(res);
      }
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
    });
  }, [dispatch, profile]);

  return (
    <div>
      <form>
        <section>
          <a href={profile.payload.image} target="_blank" rel="noreferrer">
            <img
              src={profile.payload.image}
              alt={profile.payload.name}
              width="200px"
              height="200px"
            />
          </a>
        </section>
        <section>
          <div>
            <label to="name">Name : </label>
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
            <label to="job_title">Job Title : </label>
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
            <label to="phone">Phone Number : </label>
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
