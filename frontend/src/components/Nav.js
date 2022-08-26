import React from "react";
import { NavLink } from "react-router-dom";

export default function Nav() {
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
    </nav>
  );
}
