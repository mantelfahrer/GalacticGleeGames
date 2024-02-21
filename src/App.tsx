import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Community from "./routes/Community";
import GameDetails from "./routes/GameDetails";
import GamesPage from "./routes/GamesPage";
import Home from "./routes/Home";
import NewsPage from "./routes/NewsPage";
import Shop from "./routes/Shop";
import AboutUs from "./routes/AboutUs";
import NewsDetails from "./routes/NewsDetails";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news/:id" element={<NewsDetails />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/games/:gameName" element={<GameDetails />} />
        <Route path="/games" element={<GamesPage />} />
        <Route path="/community" element={<Community />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
