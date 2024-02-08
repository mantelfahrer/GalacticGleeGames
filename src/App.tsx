import React from "react";
import "./App.scss";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" Component={Home} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
