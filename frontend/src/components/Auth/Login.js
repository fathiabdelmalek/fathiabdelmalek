import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../actions/auth";
import CSRFToken from "../CSRFToken";

export default function Login({ isAuthenticated }) {
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
    try {
      const res = await dispatch(login(formData.email, formData.password));
      if (res.success) {
        navigate("/", { replace: true });
      } else if (res.email_error) {
        setEmailError(res.email_error);
        setPasswordError("");
      } else if (res.password_error) {
        setEmailError("");
        setPasswordError(res.password_error);
      }
    } catch (err) {
      console.log(err);
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
