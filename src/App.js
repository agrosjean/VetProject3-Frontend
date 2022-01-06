import React from "react";
import "./App.css";
import Navbar from "../src/components/Navbar";
import Dogs from "../src/pages/Dogs";
import Appointments from "../src/pages/Appointments";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../src/pages/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dogs" element={<Dogs />} />
        <Route path="/appointments" element={<Appointments />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
