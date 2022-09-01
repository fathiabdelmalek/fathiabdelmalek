import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../actions/auth";
import CSRFToken from "../CSRFToken";
import instance from "../../axios";
import Cookie from "js-cookie";

export default function Login({
  isAuthenticated,
  email_error,
  password_error,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialFormData = Object.freeze({
    email: "",
    password: "",
  });
  const [formData, setFormData] = useState(initialFormData);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (isAuthenticated) {
      console.log("you are already logged in");
      navigate("/", { replace: true });
    }
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    // try {
    //   await dispatch(login(formData.email, formData.password)).then(() => {
    //     if (isAuthenticated) {
    //       console.log("login success");
    //       navigate("/", { replace: true });
    //       // window.location.reload();
    //     } else {
    //       console.log("login failed");
    //     }
    //   });
    // } catch (err) {
    //   console.log(err);
    // }
    const headers = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": Cookie.get("csrftoken"),
      },
    };
    const body = JSON.stringify({
      email: formData.email,
      password: formData.password,
    });
    try {
      await instance
        .post(`admin/login/`, body, headers)
        .then((res) => {
          if (res.data.success) {
            navigate("/", { replace: true });
            // window.location.reload();
          } else if (res.data.email_error) {
            console.log(res.data.email_error);
            setEmailError(res.data.email_error);
          } else if (res.data.password_error) {
            console.log(res.data.password_error);
            setPasswordError(res.data.password_error);
          } else {
            console.log(res.data);
          }
        })
        .catch((err) => console.log(err));
    } catch (er) {
      console.log(er);
    }
  };

  return (
    <div>
      <div>
        <form>
          <CSRFToken />
          <div>
            <label to="email">Email Address : </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email Address"
              onChange={onChange}
            />
            <p>{emailError}</p>
          </div>
          <div>
            <label to="password">Password : </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              onChange={onChange}
            />
            <p>{passwordError}</p>
          </div>
          <div>
            <button type="submit" onClick={onSubmit}>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
