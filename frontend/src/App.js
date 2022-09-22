import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Project from "./components/Project";
import Login from "./components/Auth/Login";
import Logout from "./components/Auth/Logout";
import { checkAuthenticated } from "./actions/auth";
import SkillsSettings from "./components/Settings/Skills";
import ProfileSettings from "./components/Settings/Profile";
import ProjectsSettings from "./components/Settings/Projects";
import ProjectSettings from "./components/Settings/Project";
import NewProject from "./components/Settings/Projects/New";

export default function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuthenticated());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Nav isAuthenticated={isAuthenticated} />
      <main className="container my-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<Profile />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<Project />} />
          <Route path="/contact" element={<Contact />} />
          {/* Authentication */}
          <Route
            path={"/login"}
            element={<Login isAuthenticated={isAuthenticated} />}
          />
          <Route
            path={"/logout"}
            element={<Logout isAuthenticated={isAuthenticated} />}
          />
          {/* Settings */}
          <Route
            path="/settings/profile"
            element={<ProfileSettings isAuthenticated={isAuthenticated} />}
          />
          <Route
            path="/settings/skills"
            element={<SkillsSettings isAuthenticated={isAuthenticated} />}
          />
          <Route
            path="/settings/projects"
            element={<ProjectsSettings isAuthenticated={isAuthenticated} />}
          />
          <Route
            path="/settings/projects/:id"
            element={<ProjectSettings isAuthenticated={isAuthenticated} />}
          />
          <Route
            path="/settings/projects/new"
            element={<NewProject isAuthenticated={isAuthenticated} />}
          />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
