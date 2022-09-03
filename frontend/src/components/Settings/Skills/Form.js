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

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(createSkill(formData.name, formData.value));
      setFormData({ name: "", value: "" });
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
