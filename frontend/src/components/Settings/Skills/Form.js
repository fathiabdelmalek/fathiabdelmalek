import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createSkill } from "../../../actions/skills";

export default function Form() {
  const dispatch = useDispatch();
  const initialFormData = Object.freeze({
    name: "",
    value: "",
  });
  const [formData, setFormData] = useState(initialFormData);
  const [nameError, setNameError] = useState("");
  const [valueError, setValueError] = useState("");

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await dispatch(createSkill(formData.name, formData.value));
      if (res.success) {
        setFormData({ name: "", value: "" });
      } else if (res.name_error) {
        setNameError(res.name_error);
        setValueError("");
      } else if (res.value_error) {
        setNameError("");
        setValueError(res.value_error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form>
        <div>
          <label to="name">skill Name : </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Skill name"
            value={formData.name}
            onChange={onChange}
          />
          <p>{nameError}</p>
        </div>
        <div>
          <label to="value">skill Value : </label>
          <input
            type="number"
            id="value"
            name="value"
            placeholder="Skill value"
            value={formData.value}
            min={10}
            max={100}
            onChange={onChange}
          />
          <p>{valueError}</p>
        </div>
        <div>
          <button type="submit" onClick={onSubmit}>
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
