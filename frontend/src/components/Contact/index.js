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
    <div>
      <form>
        <CSRFToken />
        <div>
          <label to="email">Your Email Address : </label>
          <input
            required
            id="email"
            name="email"
            type="email"
            onChange={onChange}
          />
        </div>
        <div>
          <label to="body">Your Message : </label>
          <textarea required id="body" name="body" onChange={onChange} />
        </div>
        <div>
          <button type="submit" onClick={onSubmit}>
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
}
