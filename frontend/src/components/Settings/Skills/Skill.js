import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editSkill, deleteSkill } from "../../../actions/skills";

export default function List({ skill }) {
  const dispatch = useDispatch();
  const initialFormData = Object.freeze({
    value: "",
  });
  const [formData, setFormData] = useState(initialFormData);
  const [valueMessage, setValueMessage] = useState("");

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onEdit = async (e) => {
    e.preventDefault();
    try {
      const res = await dispatch(
        editSkill(skill.id, skill.name, formData.value)
      );
      if (res.success) {
        setValueMessage(res.success);
      } else {
        setValueMessage(res.value_error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onDelete = async (e) => {
    e.preventDefault();
    try {
      dispatch(deleteSkill(skill.id));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setFormData({ value: skill.value });
  }, [skill.value]);

  return (
    <form>
      <label to="value">{skill.name}</label>
      <input
        type="number"
        id="value"
        name="value"
        value={formData.value}
        onChange={onChange}
      />
      <button onClick={onEdit}>Save</button>
      <button onClick={onDelete}>Delete</button>
      <p>{valueMessage}</p>
    </form>
  );
}
