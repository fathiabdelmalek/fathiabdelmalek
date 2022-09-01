import React from "react";
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
  dispatch(checkAuthenticated());
  const auth = useSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <Nav isAuthenticated={auth.payload.isAuthenticated} />
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
            element={
              <Login
                isAuthenticated={auth.payload.isAuthenticated}
                email_error={auth.payload.email_error}
                password_error={auth.payload.password_error}
              />
            }
          />
          <Route
            path={"/logout"}
            element={<Logout isAuthenticated={auth.payload.isAuthenticated} />}
          />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
