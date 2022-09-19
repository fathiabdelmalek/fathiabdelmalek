import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Settings({ isAuthenticated, referer }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate(-1, { replace: true });
  }, [isAuthenticated, navigate]);

  return (
    <div>
      <NavLink to={`/settings/profile`}>Profile</NavLink>
      <NavLink to={`/settings/projects`}>Projects</NavLink>
      <NavLink to={`/settings/skills`}>Skills</NavLink>
    </div>
  );
}
