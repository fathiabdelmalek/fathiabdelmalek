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

export default function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuthenticated());
  }, []);

  return (
    <BrowserRouter>
      <Nav isAuthenticated={isAuthenticated} />
      <main>
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
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
