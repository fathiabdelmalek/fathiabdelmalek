import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Skills from "./components/Skills";
import Projects from "./components/Projects";

export default function App() {
  return (
    <BrowserRouter>
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<Profile />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
