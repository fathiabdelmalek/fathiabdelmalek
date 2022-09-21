import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { sendMessage } from "../../actions/contact";
import CSRFToken from "../CSRFToken";

export default function Contact() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    body: "",
  });
  const [messageSent, setMessageSent] = useState(false);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(sendMessage(formData.email, formData.body));
    setMessageSent(true);
  };
  if (messageSent) navigate("/");

  return (
    <form>
      <CSRFToken />
      <h1 className="text-center mb-4">Send me a message</h1>
      <div className="mb-3">
        <label className="form-label" to="email">
          Your Email Address :{" "}
        </label>
        <input
          className="form-control"
          id="email"
          name="email"
          type="email"
          onChange={onChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label" to="body">
          Your Message :{" "}
        </label>
        <textarea
          className="form-control"
          id="body"
          name="body"
          onChange={onChange}
          required
        />
      </div>
      <div className="mb-3">
        <button
          className="btn btn-fluid btn-primary"
          type="submit"
          onClick={onSubmit}
        >
          Send Message
        </button>
      </div>
    </form>
  );
}
