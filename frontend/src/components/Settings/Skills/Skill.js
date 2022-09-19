import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editSkill, deleteSkill } from "../../../actions/skills";

export default function List({ skill }) {
  const dispatch = useDispatch();
  const initialFormData = Object.freeze({
    name: "",
    value: "",
  });
  const [formData, setFormData] = useState(initialFormData);
  const [valueMessage, setValueMessage] = useState("");

  useEffect(() => {
    setFormData({
      name: skill.name,
      value: skill.value,
    });
  }, [skill.name, skill.value]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onEdit = async (e) => {
    try {
      const res = await dispatch(
        editSkill(skill.id, formData.name, formData.value)
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
    try {
      dispatch(deleteSkill(skill.id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={onChange}
      />
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
    </div>
  );
}
