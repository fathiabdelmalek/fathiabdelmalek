import React from "react";
import { NavLink } from "react-router-dom";

export default function Nav({ isAuthenticated }) {
  const show = () => {
    if (isAuthenticated)
      return (
        <React.Fragment>
          <div className="nav-item">
            <h3>
              <NavLink to={"/settings/profile"} className="nav-link">
                Edit Profile
              </NavLink>
            </h3>
          </div>
          <div className="nav-item">
            <h3>
              <NavLink to={"/settings/skills"} className="nav-link">
                Edit Skills
              </NavLink>
            </h3>
          </div>
          <div className="nav-item">
            <h3>
              <NavLink to={"/settings/projects"} className="nav-link">
                Edit Projects
              </NavLink>
            </h3>
          </div>
          <div className="nav-item">
            <h3>
              <NavLink to={"/logout"} className="nav-link">
                Logout
              </NavLink>
            </h3>
          </div>
        </React.Fragment>
      );
    else
      return (
        <React.Fragment>
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
        </React.Fragment>
      );
  };

  return <nav className="container mt-4">{show()}</nav>;
}
