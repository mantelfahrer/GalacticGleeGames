import React from "react";
import "./App.scss";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NewsPage from "./components/NewsPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/news" Component={NewsPage} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
