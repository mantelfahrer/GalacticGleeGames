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
import PolicyTemp from "./routes/PolicyTemp";
import Contact from "./routes/Contact";
import Login from "./routes/Login";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/news/:id" element={<NewsDetails />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/games/:gameName" element={<GameDetails />} />
        <Route path="/games" element={<GamesPage />} />
        <Route path="/community" element={<Community />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<PolicyTemp />} />
        <Route path="/cookie" element={<PolicyTemp />} />
        <Route path="/terms-of-service" element={<PolicyTemp />} />
        <Route path="/user-data-protection" element={<PolicyTemp />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
