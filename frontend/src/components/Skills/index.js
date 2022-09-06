import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSkills } from "../../actions/skills";
import List from "./List";

export default function Skills() {
  const skills = useSelector((state) => state.skills);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSkills());
  }, [dispatch]);

  return (
    <div>{skills.loading ? "Loading" : <List skills={skills.payload} />}</div>
  );
}
