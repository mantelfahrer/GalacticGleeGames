import React from "react";
import "./App.scss";
import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NewsPage from "./routes/NewsPage";
import GamesPage from "./routes/GamesPage";
import GameDetails from "./routes/GameDetails";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/games/:gameName" element={<GameDetails />} />
        <Route path="/games" element={<GamesPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
