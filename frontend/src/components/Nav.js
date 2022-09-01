import React from "react";
import { NavLink } from "react-router-dom";

export default function Nav({ isAuthenticated }) {
  const render = () => {
    if (isAuthenticated)
      return (
        <div className="nav-item">
          <h3>
            <NavLink to={"/logout"} className="nav-link">
              Logout
            </NavLink>
          </h3>
        </div>
      );
    else
      return (
        <div className="nav-item">
          <h3>
            <NavLink to={"/login"} className="nav-link">
              Login
            </NavLink>
          </h3>
        </div>
      );
  };

  return (
    <nav>
      <div className="nav-item">
        <h3>
          <NavLink to={"/about"} className="nav-link">
            About Me
          </NavLink>
        </h3>
      </div>
      <div className="nav-item">
        <h3>
          <NavLink to={"/skills"} className="nav-link">
            My Skills
          </NavLink>
        </h3>
      </div>
      <div className="nav-item">
        <h3>
          <NavLink to={"/projects"} className="nav-link">
            My Projects
          </NavLink>
        </h3>
      </div>
      <div className="nav-item">
        <h3>
          <NavLink to={"/contact"} className="nav-link">
            Contact Me
          </NavLink>
        </h3>
      </div>
      {render()}
    </nav>
  );
}
