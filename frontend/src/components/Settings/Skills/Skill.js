import React from "react";
import { useDispatch } from "react-redux";
import { deleteSkill } from "../../../actions/skills";

export default function List({ skill }) {
  const dispatch = useDispatch();

  const onEdit = async (e) => {
    e.preventDefault();
  };

  const onDelete = async (e) => {
    e.preventDefault();
    try {
      dispatch(deleteSkill(skill.id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form>
      <label to="value">{skill.name}</label>
      <input type="number" id="value" name="value" value={skill.value} />
      <button type="submit" onClick={onEdit}>
        Edit
      </button>
      <button type="submit" onClick={onDelete}>
        Delete
      </button>
    </form>
  );
}
