import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../actions/projects";
import List from "./List";

export default function Projects() {
  const projects = useSelector((state) => state.projects);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData());
  }, []);

  return (
    <div>
      {projects.loading ? "Loading" : <List projects={projects.payload} />}
    </div>
  );
}
